# KELAN SECURITY — COMPLETE PROJECT HANDOFF DOCUMENT

## What Kelan Is
Kelan Security (Kernel-Level Agentic Network Security) is a zero-trust network security system. Every network packet is identified, intent-labeled, and AI-verified before it reaches the application layer. It is not just a security tool — it is designed as a new network layer standard called AITP (Adaptive Intent Transport Protocol).

## Core Architecture
```
Incoming Packet
      ↓
eBPF/XDP (kernel layer, <1μs)     ← Rust, stays Rust forever
      ↓
AITP 5-Phase Handshake            ← ML-KEM-768 + X25519 + Ed25519
      ↓
Sentinel Anomaly Detector         ← Python
      ↓
Ollama AI Trust Engine            ← Python, calls local LLM
      ↓
Verdict: ALLOW / DENY / MONITOR
      ↓
PERMIT_MAP insert or drop         ← eBPF kernel map
```

## Two-Machine Setup
### MacBook M4 (development + Ollama)
- Runs: Ollama with qwen2.5:3b model
- Runs: aitp-server (FastAPI Python)
- Ollama binds: OLLAMA_HOST=0.0.0.0 port 11434
- Server binds: 0.0.0.0:3000

### Kali Linux (bare metal, Debian 12, root)
- Runs: kelan-ebpf-loader (Rust, XDP enforcement)
- Runs: aitp-client (enrolled agent)
- eBPF XDP loaded on eth0/wlan0
- Connects to MacBook for trust verdicts

## Technology Stack
### CURRENT (production):
- **Server:** FastAPI + SQLAlchemy + Python 3.11
- **AI model:** qwen2.5:3b via Ollama (local, no API key)
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **eBPF:** Rust + aya-rs (XDP kernel programs)
- **Crypto:** ML-KEM-768 + X25519 hybrid PQ KEM
- **Identity:** Ed25519 signing
- **Tests:** pytest, 71 passing

### FUTURE (when GPU machine available):
- **AI model:** gemma3:9b (6GB VRAM) or gemma3:27b (18GB VRAM)
- **Switch by:** changing OLLAMA_MODEL in .env only

## Project Structure
```
kelan-security/
├── kelan/                    # Python server (ACTIVE)
│   ├── server.py             # FastAPI app, all routes
│   ├── database.py           # SQLAlchemy async ORM
│   ├── config.py             # pydantic-settings
│   ├── trust/
│   │   ├── hybrid_engine.py  # Ollama + circuit breaker
│   │   ├── circuit_breaker.py
│   │   └── fallback_rules.py # deterministic fallback
│   ├── simulation/
│   │   └── engine.py         # synthetic session generator
│   ├── sentinel/
│   │   └── detector.py       # anomaly detection
│   ├── protocol/
│   │   ├── handshake.py      # 5-phase AITP handshake
│   │   └── session.py        # SessionContext
│   └── observability/
│       └── audit.py          # structured JSON audit log
├── kelan-ebpf/               # Rust XDP program (ACTIVE)
├── kelan-ebpf-loader/        # Rust aya loader (ACTIVE)
├── archive/rust/             # Old Rust server (archived)
├── static/dashboard.html     # Live dashboard
├── tests/
│   ├── conftest.py
│   └── test_api.py
├── requirements.txt          # pinned
├── requirements-dev.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
└── .github/workflows/ci.yml
```

## AITP 5-Phase Handshake
- **Phase 1 — SYN:** Client sends entity_id + ML-KEM pubkey + intent
- **Phase 2 — SYN-ACK:** Server sends ML-KEM ciphertext + X25519 pubkey
- **Phase 3 — KEM-COMPLETE:** Client sends Ed25519 signature over phases 1+2
- **Phase 4 — AI-VERDICT:** Server calls Ollama, gets ALLOW/DENY/MONITOR
- **Phase 5 — COMPLETE:** If ALLOW, server inserts into eBPF PERMIT_MAP

> [!IMPORTANT]
> **CRITICAL RULE:** PERMIT_MAP is ONLY written at Phase 5. Never at Phase 1 (prevents TOCTOU attack).

## API Endpoints
- `GET  /dashboard`              → live HTML dashboard
- `GET  /api/health`             → server status + Ollama connected
- `GET  /api/stats`              → metrics (sessions, verdicts, drops)
- `GET  /api/verdicts`           → {"verdicts": [...], "total": N}
- `GET  /api/anomalies`          → {"anomalies": [...]}
- `GET  /api/sentinel/events`    → sentinel anomaly feed
- `GET  /api/ebpf/status`        → XDP mode, map entries, drop counts
- `GET  /api/sessions`           → active sessions (auth required)
- `POST /api/enroll`             → entity enrollment + handshake
- `POST /api/trust/evaluate`     → manual trust verdict via Ollama
- `POST /api/simulate/toggle`    → start/stop simulation mode
- `POST /api/simulate/run`       → run one synthetic scenario
- `POST /api/xdp/drop`           → eBPF loader reports drops here
- `WS   /ws/agent`               → real-time verdict sync to Kali

## Environment Variables
```bash
# Ollama AI Engine
OLLAMA_MODEL=qwen2.5:3b           # CPU model (current)
# OLLAMA_MODEL=gemma3:9b          # GPU model (future)
# OLLAMA_MODEL=gemma3:27b         # High-end GPU (future)
OLLAMA_ENDPOINT=http://localhost:11434  # or Mac IP from Kali
OLLAMA_TIMEOUT_SECS=8.0

# Database
DATABASE_URL=sqlite+aiosqlite:///./kelan.db
# DATABASE_URL=postgresql+asyncpg://kelan:pass@localhost/kelan

# Security
JWT_SECRET=<openssl rand -hex 32>
REQUIRE_PQ=false

# Server
SERVER_HOST=0.0.0.0
SERVER_PORT=3000

# eBPF (Kali only)
XDP_INTERFACE=eth0
KELAN_SERVER_URL=http://localhost:3000
```

## Known Fixed Bugs (all resolved, 71 tests passing)
1. **TypeError in /api/stats**
   - *Cause:* `sum(eng.values())` where `eng` contains strings + dicts
   - *Fix:* `eng.get("total", 0)` — extract integer directly
2. **NoneType in database.py:27**
   - *Cause:* `init_db()` not called before test client starts
   - *Fix:* `conftest.py` fixture calls `await init_db()` first
3. **NameError HandshakeManager**
   - *Cause:* imported inside fixture, not at module top
   - *Fix:* moved to top of `test_api.py` file
4. **NameError _xdp_drops**
   - *Cause:* global variable used before module-level init
   - *Fix:* `_xdp_drops: int = 0` at module level in `server.py`
5. **403 on test_enroll_legit**
   - *Cause:* `REQUIRE_PQ=true` in `.env`, test sends no `kem_public_key`
   - *Fix:* conftest sets `require_pq=False` for general tests, PQ tests toggle it explicitly
6. **AssertionError on /api/verdicts**
   - *Cause:* endpoint returned raw list, not `{"verdicts": [...]}`
   - *Fix:* wrapped in dict with total count
7. **Infinite loop in session.py eviction**
   - *Cause:* while loop popped from dict but not from deque
   - *Fix:* `deque(maxlen=N)` handles auto-eviction, dict syncs once
8. **IDE red squiggle on conftest.py**
   - *Cause:* IDE using system Python 3.14 (homebrew) not `.venv`
   - *Fix:* VS Code → Python: Select Interpreter → `.venv/bin/python`. Also removed unnecessary `import pytest` from `conftest.py`

## Known Memory Leaks (fixes to apply)
1. `aiohttp.ClientSession()` created per Ollama call — never closed
   - *Fix:* ONE shared session in `HybridTrustEngine._get_session()`. Use: `TCPConnector(limit=5, enable_cleanup_closed=True)`
2. SQLAlchemy sessions not closed on exceptions
   - *Fix:* `@asynccontextmanager get_db()` with `try/finally` `close()`
3. Unbounded lists on app.state (verdicts, sessions, anomalies)
   - *Fix:* `deque(maxlen=500)` for verdicts, `maxlen=1000` sessions
4. `asyncio.create_task()` in loops — Tasks never collected
   - *Fix:* store `self._task`, `cancel()` and `await` on `stop()`
5. Simulation loop running too fast
   - *Fix:* `await asyncio.sleep(5.0)` between iterations. `gc.collect()` every 50 verdicts

## Model Switching (future GPU upgrade)
```python
# In kelan/trust/hybrid_engine.py
# Everything auto-adjusts from OLLAMA_MODEL env var

# CURRENT (CPU, qwen2.5:3b):
#   Uses ChatML format: <|im_start|>system...
#   stop tokens: ["<|im_end|>", "\n\n", "```"]
#   num_predict: 80
#   temperature: 0.1

# FUTURE (GPU, gemma3:9b):
#   Uses plain prompt format
#   stop tokens: ["\n\n\n"]
#   num_predict: 120
#   temperature: 0.15

# TO SWITCH: change .env only:
#   OLLAMA_MODEL=gemma3:9b
#   OLLAMA_TIMEOUT_SECS=15.0
#   No code changes needed.
```

## Qwen2.5:3b JSON Parsing Quirks
```python
# Qwen adds these that must be stripped:
# 1. Markdown fences:  ```json ... ```
# 2. Chinese character prefix before JSON
# 3. Explanation text after JSON

# Parser must:
# 1. raw.replace("```json","").replace("```","")
# 2. Find first { and last } — extract that slice only
# 3. Normalise verdict to uppercase
# 4. Clamp confidence to 0.0–1.0
# 5. On any failure: return MONITOR, confidence 0.3
```

## Simulation Scenarios
```python
SCENARIOS = {
  "legitimate": {
    intents:   ["model_inference","db_read","health_check"],
    anomalies: [],
    weight:    0.60,   # 60% of simulation traffic
  },
  "suspicious": {
    intents:   ["control_signal","config_write","bulk_export"],
    anomalies: ["new_entity","off_hours"],
    weight:    0.25,
  },
  "anomalous": {
    intents:   ["data_exfil","lateral_move","recon_scan"],
    anomalies: ["unknown_entity","high_frequency:45/min"],
    weight:    0.15,
  },
}
# Press S on dashboard to toggle simulation
# POST /api/simulate/toggle  to toggle via API
# POST /api/simulate/run     body: {"scenario":"anomalous"}
```

## How to Start the System
```bash
# On MacBook — start Ollama
OLLAMA_HOST=0.0.0.0 ollama serve &
ollama pull qwen2.5:3b  # if not already pulled

# On MacBook — start server
cd kelan-python   # or wherever project lives
source .venv/bin/activate
uvicorn kelan.server:app \
  --host 0.0.0.0 \
  --port 3000 \
  --workers 1 \
  --log-level info

# On Kali — start eBPF loader
sudo ./kelan-ebpf-loader \
  --interface eth0 \
  --server-url http://<MAC_IP>:3000

# Verify everything
curl http://localhost:3000/api/health
open http://localhost:3000/dashboard
```

## Current Test Command
```bash
source .venv/bin/activate
python -m pytest -x --tb=short -q
# Expected: 71 passed, 0 failed
```

## What Still Needs Doing (priority order)
### IMMEDIATE:
1. Apply memory leak fixes (8 fixes above)
2. Fix VS Code interpreter → `.venv/bin/python`
3. Run: `python -m pytest` → all 71 pass
4. Run server + simulation → verify no MemoryError after 30min

### SHORT TERM:
5. Deploy to Oracle Cloud free tier (ARM64)
6. Set up nginx + Let's Encrypt TLS
7. Add Prometheus `/metrics` endpoint
8. Add Grafana dashboard JSON

### LAUNCH:
9. `demo.kelan.dev` live with simulation running
10. GitHub README with demo GIF
11. Hacker News "Show HN" post
12. Stripe payment + license key system
13. First customer outreach

### GPU UPGRADE (when ready):
14. `ollama pull gemma3:9b` on new machine
15. Change `.env`: `OLLAMA_MODEL=gemma3:9b`
16. Change `.env`: `OLLAMA_TIMEOUT_SECS=15.0
17. Done — no code changes needed`

## Security Features Implemented
- **Crypto:** ML-KEM-768 + X25519 hybrid PQ KEM
- **Identity:** Ed25519 per-entity signing keys
- **Passwords:** Argon2id (65536KB memory, 3 iterations)
- **JWT:** RS256 asymmetric, JTI revocation
- **Nonces:** LRU dedup store (100k entries, 5min TTL)
- **Rate limiting:** slowapi (10/min auth, 20/min enroll)
- **Headers:** X-Frame-Options, X-Content-Type, CSP, HSTS
- **Input:** Pydantic validators, UUID format check, intent allowlist, max field lengths
- **SQL:** SQLAlchemy ORM only, zero string concat
- **Audit:** Structured JSON log every security event
- **eBPF:** Signed bytecode, bounded map sizes

## Current Blocker (reason for this handoff)
- **Problem:** VS Code on MacBook using system Python 3.14 (`/opt/homebrew/bin/python3.14`) instead of project `.venv` (`.venv/bin/python` with all packages)
- **Result:** Red squiggles on imports, IDE confusion
- **Fix:**
  1. `source .venv/bin/activate` (in terminal)
  2. Cmd+Shift+P → Python: Select Interpreter → choose `.venv/bin/python`
  3. All imports resolve, tests run green
- **Underlying fix also needed:** Apply the 8 memory leak fixes from above so the server runs stably on macOS for development.
