<template>
  <!-- DOCS SECTION -->
  <section id="docs" class="docs-section">
    <div class="container">
      <div class="text-center mb-xl">
        <SectionBadge text="Documentation">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </template>
        </SectionBadge>
        <h2 class="section-title">How do you want to use Kelan?</h2>
        <p class="section-sub">
          Choose your path. Free and open source for developers.
          Full platform for enterprise teams.
        </p>
      </div>

      <!-- Three path cards -->
      <div v-if="currentView === 'paths'" class="docs-paths" id="docs-paths">
        <!-- Path 1: Free / Open Source -->
        <div class="docs-path-card glass-panel" @click="showDocsSection('opensource')">
          <div class="docs-path-icon">
            <svg class="docs-path-svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="8" rx="1.5" />
              <rect x="2" y="14" width="20" height="8" rx="1.5" />
              <line x1="6" y1="6" x2="6.01" y2="6" stroke-linecap="round" stroke-width="2.5" />
              <line x1="6" y1="18" x2="6.01" y2="18" stroke-linecap="round" stroke-width="2.5" />
              <path d="M12 6h6M12 18h6" stroke-linecap="round" />
              <path d="M7 10h10M7 14h10" stroke-opacity="0.3" stroke-dasharray="2 2" />
            </svg>
          </div>
          <div class="docs-path-tier">FREE & OPEN SOURCE</div>
          <div class="docs-path-title">Self-host with local AI models</div>
          <div class="docs-path-desc">
            Run the full Intelligence Core on your own infrastructure.
            Bring your own local AI models (via Ollama/Llama) or cloud APIs.
            No account required. No data leaves your network.
          </div>
          <div class="docs-path-features">
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> SQLite database integration</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Fully self-contained local AI evaluation</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Out-of-the-box Sentinel monitoring</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Unlimited community nodes setup</div>
          </div>
          <div class="docs-path-tags">
            <span class="docs-tag">GitHub</span>
            <span class="docs-tag">Docker</span>
            <span class="docs-tag">Local AI / Ollama</span>
            <span class="docs-tag">Up to 5 nodes</span>
          </div>
          <div class="docs-path-cta">Get started →</div>
        </div>

        <!-- Path 2: GitHub / SDK -->
        <div class="docs-path-card glass-panel" @click="openGitHub">
          <div class="docs-path-icon">
            <svg class="docs-path-svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
          </div>
          <div class="docs-path-tier">SOURCE CODE</div>
          <div class="docs-path-title">Read the code. Audit. Contribute.</div>
          <div class="docs-path-desc">
            Full source code on GitHub. 131 automated tests.
            Rust workspace. BSL 1.1 license — free for non-commercial use,
            commercial license for production deployments.
          </div>
          <div class="docs-path-features">
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Rust SDK & crate workspace</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Comprehensive 131 unit tests</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Fully open driver and transport hooks</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Permissive BSL 1.1 license architecture</div>
          </div>
          <div class="docs-path-tags">
            <span class="docs-tag">Rust</span>
            <span class="docs-tag">BSL 1.1</span>
            <span class="docs-tag">131 tests</span>
            <span class="docs-tag">MIT SDK</span>
          </div>
          <div class="docs-path-cta">View on GitHub →</div>
        </div>

        <!-- Path 3: Paid / Enterprise -->
        <div class="docs-path-card glass-panel" @click="showDocsSection('enterprise')">
          <div class="docs-path-icon">
            <svg class="docs-path-svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 11 11 13 15 9" stroke-linecap="round" />
            </svg>
          </div>
          <div class="docs-path-tier">PAID PLANS</div>
          <div class="docs-path-title">Managed deployment. Unlimited scale.</div>
          <div class="docs-path-desc">
            Startup ($499/mo) and Enterprise ($2,000/mo) plans include
            commercial licenses, Postgres support, SSO, air-gap mode,
            and dedicated customer success management.
          </div>
          <div class="docs-path-features">
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> High-volume PostgreSQL clustering</div>
            <div class="docs-path-feat" style="color:var(--green-primary);"><span class="docs-path-feat-tick">✓</span> Nvidia Nemotron acceleration</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Advanced SAML/OIDC SSO integrations</div>
            <div class="docs-path-feat"><span class="docs-path-feat-tick">✓</span> Dedicated SLA & enterprise CSM support</div>
          </div>
          <div class="docs-path-tags">
            <span class="docs-tag">Unlimited nodes</span>
            <span class="docs-tag">Postgres</span>
            <span class="docs-tag">SSO</span>
            <span class="docs-tag">SLA</span>
          </div>
          <div class="docs-path-cta">View plans →</div>
        </div>
      </div>

      <!-- ── OPEN SOURCE DOCS ──────────────────────────────────────────────── -->
      <div v-else-if="currentView === 'opensource'" class="docs-content">
        <div class="docs-back" @click="showDocsPaths">← Back to docs</div>
        <div class="docs-layout">
          <nav class="docs-nav">
            <div class="docs-nav-group">Getting Started</div>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'qs' }" @click="switchDoc('qs')">Quick Start</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'requirements' }" @click="switchDoc('requirements')">Requirements</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'config' }" @click="switchDoc('config')">Configuration</a>
            <div class="docs-nav-group">Self-Hosting</div>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'docker' }" @click="switchDoc('docker')">Docker</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'gemini' }" @click="switchDoc('gemini')">AI Engine Setup</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'enroll' }" @click="switchDoc('enroll')">Enrolling devices</a>
            <div class="docs-nav-group">Protocol</div>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'protocol' }" @click="switchDoc('protocol')">AITP Overview</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'intents' }" @click="switchDoc('intents')">Intent Codes</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'trust' }" @click="switchDoc('trust')">Trust Scoring</a>
            <div class="docs-nav-group">SDK</div>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'sdk' }" @click="switchDoc('sdk')">Rust SDK</a>
            <a class="docs-nav-item" :class="{ active: currentDoc === 'api' }" @click="switchDoc('api')">REST API</a>
          </nav>
          
          <div class="docs-body">
            <!-- Quick Start -->
            <div v-if="currentDoc === 'qs'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Quick Start</div>
              <h1 class="docs-h1">Quick Start</h1>
              <p class="docs-p">
                Run the full Kelan Intelligence Core in 3 commands.
                You need Docker and either a local AI model (via Ollama) or a free Gemini API key.
              </p>

              <h3 class="docs-h3">1. Setup your AI engine</h3>
              <p class="docs-p">Run a local model using Ollama (e.g., <code>ollama run nemotron</code> or <code>ollama run llama3</code>) or get a free Gemini API key from <strong style="color:#FFF">aistudio.google.com</strong>.</p>

              <h3 class="docs-h3">2. Start the Intelligence Core</h3>
              <pre class="docs-code"># To run with a local model (Ollama):
docker run -d \
  -p 3000:3000 \
  -p 9999:9999/udp \
  -e AITP_LOCAL_MODEL=true \
  -e AITP_MODEL_ENDPOINT=http://host.docker.internal:11434 \
  -e AITP_MODEL_NAME=nemotron \
  -e AITP_JWT_SECRET=$(openssl rand -base64 48) \
  -v kelan_data:/app/data \
  ghcr.io/kelan-security/kelan-core:latest

# Or to run with Gemini API:
docker run -d \
  -p 3000:3000 \
  -p 9999:9999/udp \
  -e GEMINI_API_KEY=<span style="color:var(--green-primary)">your_key_here</span> \
  -e AITP_JWT_SECRET=$(openssl rand -base64 48) \
  -v kelan_data:/app/data \
  ghcr.io/kelan-security/kelan-core:latest</pre>

              <h3 class="docs-h3">3. Create your account</h3>
              <pre class="docs-code">curl -s -X POST http://localhost:3000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"org_name":"My Org","email":"you@example.com","password":"StrongPass123!"}' \
  | python3 -m json.tool

<span style="color:#6B7A6B"># Save the token from the response:</span>
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/signin \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"StrongPass123!"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")</pre>

              <h3 class="docs-h3">4. Open the dashboard</h3>
              <pre class="docs-code">open http://localhost:3000</pre>

              <h3 class="docs-h3">5. Enroll a device</h3>
              <pre class="docs-code"><span style="color:#6B7A6B"># Install the client agent on any Linux / macOS device:</span>
curl -fsSL https://install.kelan.io | bash

<span style="color:#6B7A6B"># Enroll with your Intelligence Core:</span>
kelan-agent enroll --server localhost --token $TOKEN
kelan-agent start</pre>

              <div class="docs-callout">
                Your Intelligence Core is now protecting connections from this device.
                Every session is evaluated by your local or cloud AI model before data flows.
              </div>
            </div>

            <!-- Requirements -->
            <div v-if="currentDoc === 'requirements'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Requirements</div>
              <h1 class="docs-h1">System Requirements</h1>
              <p class="docs-p">Kelan runs on any modern Linux server or your development machine.</p>
              <h3 class="docs-h3">Minimum</h3>
              <pre class="docs-code">OS:      Linux (Ubuntu 22.04+), macOS 13+, Windows 11
CPU:     2 cores
RAM:     512MB (8GB+ if running AI models locally)
Storage: 2GB (10GB+ for local model weights)
Network: outbound HTTPS (if using cloud APIs like Gemini)</pre>
              <h3 class="docs-h3">Recommended (production)</h3>
              <pre class="docs-code">OS:      Ubuntu 22.04 LTS (Linux 5.15+ for eBPF enforcement)
CPU:     4 cores (8 for high-traffic deployments)
RAM:     4GB (16GB+ with GPU acceleration for local Nemotron/Llama execution)
Storage: 20GB SSD
Network: Static IP, ports 3000 (HTTP) and 9999/UDP (AITP)</pre>
              <h3 class="docs-h3">Free hosting option</h3>
              <pre class="docs-code"><span style="color:#6B7A6B"># Oracle Cloud Always Free — 24GB ARM VM, forever free</span>
# Sign up at: cloud.oracle.com → Create VM → Ampere ARM
# Best free option for running a production Intelligence Core</pre>
            </div>

            <!-- Configuration -->
            <div v-if="currentDoc === 'config'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Configuration</div>
              <h1 class="docs-h1">Configuration</h1>
              <pre class="docs-code"><span style="color:#6B7A6B"># .env file — configuration options</span>
AITP_JWT_SECRET=$(openssl rand -base64 64)

# --- AI Engine Config ---
# For Local AI (Ollama / Llama / Nemotron)
AITP_LOCAL_MODEL=true
AITP_MODEL_ENDPOINT=http://localhost:11434
AITP_MODEL_NAME=nemotron

# OR for Gemini Cloud API
# GEMINI_API_KEY=AIzaSy...
# AITP_GEMINI_MODEL=gemini-2.5-flash

<span style="color:#6B7A6B"># General Settings</span>
DATABASE_URL=sqlite://./data/kelan.db   # default
AITP_TRUST_MODE=hybrid                  # hybrid | rules | ai_only
AITP_SENTINEL_ENABLED=true
AITP_AUTO_QUARANTINE=true
AITP_HTTP_PORT=3000
AITP_UDP_PORT=9999</pre>
            </div>

            <!-- Docker -->
            <div v-if="currentDoc === 'docker'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Docker</div>
              <h1 class="docs-h1">Docker Deployment</h1>
              <pre class="docs-code"><span style="color:#6B7A6B"># Development (Local AI, SQLite, HTTP):</span>
docker run -d \
  -p 3000:3000 -p 9999:9999/udp \
  -e AITP_LOCAL_MODEL=true \
  -e AITP_MODEL_ENDPOINT=http://host.docker.internal:11434 \
  -e AITP_MODEL_NAME=nemotron \
  -e AITP_JWT_SECRET=$(openssl rand -base64 48) \
  -v kelan_data:/app/data \
  ghcr.io/kelan-security/kelan-core:latest

<span style="color:#6B7A6B"># Production (Postgres, nginx, TLS):</span>
git clone https://github.com/Kelan-Security/kelan-core
cd kelan-core
./scripts/deploy.sh yourdomain.com you@yourdomain.com</pre>
            </div>

            <!-- Gemini -->
            <div v-if="currentDoc === 'gemini'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → AI Engine Setup</div>
              <h1 class="docs-h1">Setting Up Your AI Engine</h1>
              <p class="docs-p">Kelan supports local AI model integrations (Ollama, local LLMs) as well as cloud-based Gemini API. We recommend Nvidia Nemotron or Llama 3 for local hosting.</p>
              
              <h3 class="docs-h3">Option A: Local AI Model Setup (Recommended for offline/air-gapped)</h3>
              <pre class="docs-code">1. Install Ollama: curl -fsSL https://ollama.com/install.sh | sh
2. Download model: ollama run nemotron (or llama3)
3. In your .env file, enable local execution:
   AITP_LOCAL_MODEL=true
   AITP_MODEL_ENDPOINT=http://localhost:11434
   AITP_MODEL_NAME=nemotron</pre>

              <h3 class="docs-h3">Option B: Gemini Cloud API (Fast setup)</h3>
              <pre class="docs-code">1. Go to: aistudio.google.com
2. Sign in and click "Get API key" → "Create API key"
3. In your .env file:
   GEMINI_API_KEY=AIzaSyYour_Key_Here
   AITP_GEMINI_MODEL=gemini-2.5-flash</pre>
              
              <div class="docs-callout">
                The trust LRU cache means repeat entity pairs don't re-evaluate every session.
                At steady state, ~20% of sessions query the AI model. The rest use the cache.
              </div>
            </div>

            <!-- Enrolling -->
            <div v-if="currentDoc === 'enroll'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Enrolling Devices</div>
              <h1 class="docs-h1">Enrolling Devices</h1>
              <pre class="docs-code"><span style="color:#6B7A6B"># Linux / macOS — install agent:</span>
curl -fsSL https://install.kelan.io | bash

<span style="color:#6B7A6B"># Windows — run in PowerShell as Administrator:</span>
iwr -useb https://install.kelan.io/windows | iex

<span style="color:#6B7A6B"># Enroll with Intelligence Core:</span>
kelan-agent enroll --server &lt;IC_ADDRESS&gt; --token &lt;ADMIN_JWT&gt;
kelan-agent install   # installs as system service
sudo systemctl start kelan-agent

<span style="color:#6B7A6B"># Verify:</span>
kelan-agent status</pre>
            </div>

            <!-- Protocol -->
            <div v-if="currentDoc === 'protocol'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → AITP Protocol</div>
              <h1 class="docs-h1">AITP Protocol Overview</h1>
              <pre class="docs-code">EntityID = SHA-256(Ed25519_PublicKey)   // 32 bytes, stable
S_merged = 0.4 × S_rules + 0.6 × S_AI  // hybrid trust (local Nemotron / cloud Gemini)
Verdict:  Allow ≥128 | Monitor 64–127 | Deny &lt;64</pre>
              <p class="docs-p">Read the full research paper: <a href="#" style="color:var(--green-primary);">arXiv:2026.XXXXX</a></p>
            </div>

            <!-- Intents -->
            <div v-if="currentDoc === 'intents'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Intent Codes</div>
              <h1 class="docs-h1">Intent Codes</h1>
              <pre class="docs-code">ModelInference   0x0001  // +10 trust
DataSync         0x0002  // +5  trust
ControlSignal    0x0003  // -25 trust  ⚠ high risk
Telemetry        0x0004  // +15 trust
AgentCoordinate  0x0005  // -10 trust
FileTransfer     0x0006  //  0  trust
Heartbeat        0x0007  // +20 trust
Unknown          0x00FF  // -40 trust  ✗ immediate scrutiny</pre>
            </div>

            <!-- Trust -->
            <div v-if="currentDoc === 'trust'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Trust Scoring</div>
              <h1 class="docs-h1">Trust Scoring</h1>
              <pre class="docs-code">// Hybrid scoring formula (local Nemotron / cloud Gemini)
S_merged = 0.4 × S_rules + 0.6 × S_AI

// Verdicts
Allow   if S_merged ≥ 128   // session proceeds
Monitor if 64 ≤ S_merged < 128  // proceeds, extra logging
Deny    if S_merged < 64   // killed at transport layer

// Defense / clearance gating
S_effective = min(S_merged, S_clearance_ceiling)</pre>
            </div>

            <!-- SDK -->
            <div v-if="currentDoc === 'sdk'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → Rust SDK</div>
              <h1 class="docs-h1">Rust SDK</h1>
              <pre class="docs-code"><span style="color:#6B7A6B"># Cargo.toml</span>
kelan-sdk = "0.3"</pre>
              <pre class="docs-code"><span style="color:#6B7A6B">// Protect a server (5 lines)</span>
KernexServer::builder()
    .config("kelan.toml")
    .on_session(|s| async move { s.evaluate().await })
    .build().await?
    .run().await

<span style="color:#6B7A6B">// Connect as a client (5 lines)</span>
let client = KernexClient::builder().config("kelan.toml").build().await?;
let session = client.connect("server:9999")
    .intent(IntentCode::ModelInference).await?;
session.send(b"payload").await?;</pre>
            </div>

            <!-- API -->
            <div v-if="currentDoc === 'api'" class="doc-page active">
              <div class="docs-breadcrumb">Open Source → REST API</div>
              <h1 class="docs-h1">REST API</h1>
              <p class="docs-p">All endpoints except signup/signin require <code style="color:var(--green-primary);background:#050A05;padding:2px 6px;">Authorization: Bearer &lt;JWT&gt;</code></p>
              <pre class="docs-code">POST /api/auth/signup       → create org, returns JWT
POST /api/auth/signin       → login, returns JWT
GET  /api/entities          → list enrolled devices
POST /api/entities          → register a new device
GET  /api/sessions          → list sessions (active/closed/denied)
GET  /api/sentinel/anomalies → recent anomalies
GET  /api/threats           → security incidents + timelines
GET  /api/stats             → live metrics
GET  /metrics               → Prometheus metrics endpoint
WS   /ws?token=&lt;JWT&gt;       → live event stream</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- ── ENTERPRISE DOCS ──────────────────────────────────────────────── -->
      <div v-else-if="currentView === 'enterprise'" class="docs-content">
        <div class="docs-back" @click="showDocsPaths">← Back to docs</div>
        <div class="enterprise-promo">
          <div class="docs-path-icon" style="font-size:48px;margin-bottom:24px;">◆</div>
          <h2 style="font-size:32px;font-weight:900;color:#FFF;margin-bottom:16px;">
            Enterprise & Startup Plans
          </h2>
          <p style="color:#6B7A6B;font-size:16px;line-height:1.7;margin-bottom:40px;">
            Paid plans include commercial licensing, dedicated support, PostgreSQL,
            SSO, air-gap mode, and a dedicated customer success manager.
            Onboarding includes a guided setup call.
          </p>
          <a href="mailto:team@kelan.io?subject=Paid plan inquiry"
             class="price-btn price-btn-primary"
             style="display:inline-block;max-width:280px;padding:14px 32px;font-size:14px;">
            Email us to get started →
          </a>
          <p style="color:#6B7A6B;font-size:13px;margin-top:20px;">
            Or <a @click="viewPricing" style="color:var(--green-primary);cursor:pointer;">view pricing details</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionBadge from '@/components/ui/SectionBadge.vue'

const currentView = ref('paths')
const currentDoc = ref('qs')

const showDocsSection = (section: string) => {
  currentView.value = section
  window.scrollTo({ top: document.getElementById('docs')?.offsetTop, behavior: 'smooth' })
}

const showDocsPaths = () => {
  currentView.value = 'paths'
}

const switchDoc = (id: string) => {
  currentDoc.value = id
}

const openGitHub = () => {
  window.open('https://github.com/Kelan-Security/kelan-core', '_blank')
}

const viewPricing = () => {
  showDocsPaths()
  setTimeout(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

onMounted(() => {
  if (window.location.hash === '#docs') {
    setTimeout(() => document.getElementById('docs')?.scrollIntoView(), 100)
  }
})
</script>

<style scoped>
.docs-section { 
  padding: 80px 0; 
  background: transparent; 
}

.docs-paths {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.docs-path-card {
  padding: 40px 32px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.docs-path-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 159, 0.25);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 159, 0.05);
}

.docs-path-icon {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--green-primary);
}

.docs-path-svg {
  filter: drop-shadow(0 0 8px rgba(0, 255, 159, 0.25));
}

.docs-path-tier {
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--green-primary);
  margin-bottom: 8px;
}
.docs-path-title {
  font-size: 18px;
  font-weight: 700;
  color: #FFF;
  margin-bottom: 12px;
  line-height: 1.3;
}
.docs-path-desc {
  font-size: 13px;
  color: #6B7A6B;
  line-height: 1.6;
  margin-bottom: 24px;
}
.docs-path-features {
  margin-top: auto;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
}
.docs-path-feat {
  font-size: 11.5px;
  color: #6B7A6B;
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.4;
  text-align: left;
}
.docs-path-feat-tick {
  color: var(--green-primary);
  font-weight: bold;
}
.docs-path-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 24px;
}
.docs-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--text-secondary);
}
.docs-path-cta {
  font-family: monospace;
  font-size: 13px;
  color: var(--green-primary);
}

.docs-content { max-width: 1100px; margin: 0 auto; }
.docs-back {
  font-family: monospace;
  font-size: 12px;
  color: var(--green-primary);
  cursor: pointer;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 255, 159,0.1);
  margin-bottom: 32px;
}

.docs-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
}
.docs-nav { position: sticky; top: 100px; height: fit-content; }
.docs-nav-group {
  font-family: monospace;
  font-size: 10px;
  color: rgba(0, 255, 159,0.4);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 24px 0 12px;
}
.docs-nav-item {
  display: block;
  font-size: 13px;
  color: #6B7A6B;
  cursor: pointer;
  padding: 6px 0 6px 12px;
  border-left: 2px solid transparent;
  transition: all 0.15s;
}
.docs-nav-item:hover { color: #FFF; }
.docs-nav-item.active { color: var(--green-primary); border-left-color: var(--green-primary); padding-left: 16px; }

.docs-body { min-width: 0; padding-bottom: 100px; }
.docs-breadcrumb {
  font-family: monospace;
  font-size: 11px;
  color: #6B7A6B;
  margin-bottom: 16px;
}
.docs-h1 {
  font-size: 40px;
  font-weight: 900;
  color: #FFF;
  margin-bottom: 20px;
  line-height: 1.1;
}
.docs-h3 {
  font-size: 16px;
  font-weight: 700;
  color: #FFF;
  margin: 32px 0 12px;
  padding-left: 12px;
  border-left: 2px solid var(--green-primary);
}
.docs-p {
  color: #6B7A6B;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 24px;
}
.docs-code {
  background: #050A05;
  border: 1px solid rgba(0, 255, 159,0.12);
  padding: 20px 24px;
  font-family: monospace;
  font-size: 12px;
  color: #A8C8A8;
  overflow-x: auto;
  line-height: 1.8;
  margin-bottom: 24px;
  white-space: pre;
}
.docs-callout {
  background: rgba(0, 255, 159,0.03);
  border-left: 2px solid rgba(0, 255, 159,0.3);
  padding: 16px 20px;
  font-size: 14px;
  color: #6B7A6B;
  line-height: 1.6;
  margin: 24px 0;
}

.enterprise-promo {
  max-width: 700px;
  margin: 0 auto;
  padding: 80px 24px;
  text-align: center;
}

.price-btn-primary {
  background: var(--green-primary);
  color: #000;
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  padding: 14px 32px;
  transition: all 0.2s;
}
.price-btn-primary:hover { background: #2ee010; transform: translateY(-1px); }

@media (max-width: 1024px) {
  .docs-paths { grid-template-columns: 1fr; }
  .docs-layout { grid-template-columns: 1fr; }
  .docs-nav { position: static; display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; border-bottom: 1px solid rgba(0, 255, 159,0.1); padding-bottom: 20px; }
  .docs-nav-group { display: none; }
  .docs-nav-item { border: 1px solid rgba(0, 255, 159,0.2); padding: 6px 12px; border-left: 1px solid rgba(0, 255, 159,0.2); }
}
</style>
