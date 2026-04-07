<template>
  <!-- PRODUCT SECTION -->
  <section id="product" class="product-section section">
    <div class="container">
      <!-- Section label -->
      <div class="label-wrapper">
        <span class="section-label">[ HOW IT WORKS ]</span>
      </div>
      
      <h2 class="display-lg text-center reveal">
        Every packet.<br>
        <span class="text-green">Evaluated.</span> Decided. Enforced.
      </h2>
      
      <p class="section-desc text-center reveal">
        Not after the connection. Not after the handshake. Before your application processes a single byte.
      </p>

      <!-- ── The Kill Chain flow -->
      <div class="kill-chain-wrapper reveal">
        <!-- Stage cards -->
        <div id="kill-chain" class="kill-chain-grid">
          <div 
            v-for="stage in stages" 
            :key="stage.id"
            class="kc-stage glass-panel" 
            :class="{ active: selectedStage === stage.id }"
            @click="selectStage(stage.id)"
          >
            <div class="stage-id mono">0{{ stage.id }} / {{ stage.label }}</div>
            <div class="stage-icon">{{ stage.icon }}</div>
            <div class="stage-title">{{ stage.title }}</div>
            <div class="stage-desc">{{ stage.desc }}</div>
          </div>
        </div>

        <!-- Detail panel -->
        <transition name="slide-down">
          <div v-if="selectedStageData" id="stage-detail" class="detail-panel">
            <div class="detail-content">
              <div class="detail-info">
                <div class="stage-header mono">STAGE 0{{ selectedStage }}</div>
                <div class="detail-title">{{ selectedStageData.detailTitle }}</div>
                <div class="detail-note">{{ selectedStageData.note }}</div>
              </div>
              <div class="detail-code-wrapper">
                <pre class="detail-code"><code>{{ selectedStageData.code }}</code></pre>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- ── Live terminal ticker -->
      <div class="terminal-container reveal">
        <div class="terminal-header mono"> ● LIVE — kelan intelligence core </div>
        <div class="terminal-ticker mono">
          <div v-for="(line, i) in tickerLines" :key="i" class="ticker-line">
            <span class="ticker-time">{{ line.time }}</span> 
            <span v-html="line.content"></span>
          </div>
        </div>
      </div>

      <!-- ── Capability cards -->
      <div class="capability-grid reveal">
        <div v-for="cap in capabilities" :key="cap.label" class="cap-card glass-panel">
          <div class="cap-label mono">{{ cap.label }}</div>
          <div class="cap-value display-md">
            {{ cap.value }}<span class="cap-unit text-green">{{ cap.unit }}</span>
          </div>
          <div class="cap-desc">{{ cap.desc }}</div>
          <div class="cap-footer mono">{{ cap.footer }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const selectedStage = ref<number | null>(null)

const stages = [
  { id: 1, label: 'ARRIVAL', icon: '📡', title: 'Packet arrives', desc: 'UDP packet hits the NIC. eBPF XDP fires before the kernel stack.' },
  { id: 2, label: 'IDENTITY', icon: '🔑', title: 'Who are you?', desc: 'Ed25519 signature verified. EntityID = SHA-256(pubkey). No key, no session.' },
  { id: 3, label: 'INTENT', icon: '📋', title: 'Why are you here?', desc: 'Signed intent declaration. ModelInference ≠ DataSync. Non-repudiable. Logged forever.' },
  { id: 4, label: 'TRUST', icon: '🧠', title: 'Gemini decides', desc: 'Behavioural history. Peer reputation. Intent context. Score 0–255 in <5ms.' },
  { id: 5, label: 'ENFORCE', icon: '⚡', title: 'XDP verdict', desc: 'Allow → permit map. Deny → XDP_DROP in <1μs. App never sees it.' },
]

const stageDetails: Record<number, any> = {
  1: { 
    detailTitle: "Packet Arrival — XDP fires at the driver", 
    code: `// Kernel BPF program — runs before TCP/IP stack\n#[xdp]\npub fn kernex_xdp(ctx: XdpContext) -> u32 {\n  let session_id = parse_aitp_session_id(&ctx)?;\n  match PERMIT_MAP.get(&session_id) {\n    Some(_) => xdp_action::XDP_PASS,   // ← allowed\n    None    => xdp_action::XDP_DROP,   // ← killed here\n  }\n}`, 
    note: "This code runs inside the Linux kernel. Your application never sees denied packets." 
  },
  2: { 
    detailTitle: "Identity Verification — Ed25519 challenge-response", 
    code: `// Phase 2 of 5-phase handshake\nEntityID = SHA-256(Ed25519_PublicKey)\n// Private key stored in OS keystore (TPM/Keychain/Credential Manager)\n// Credential theft ≠ identity theft\n// If key doesn't match EntityID → AITP_REJECT immediately`, 
    note: "32-byte stable identity. Survives IP changes, NAT traversal, network topology changes." 
  },
  3: { 
    detailTitle: "Intent Declaration — cryptographically signed, non-repudiable", 
    code: `pub enum IntentCode {\n  ModelInference   = 0x0001,  // +10 trust\n  DataSync         = 0x0002,  // +5  trust\n  ControlSignal    = 0x0003,  // -25 trust ⚠\n  FileTransfer     = 0x0006,  //  0  trust\n  Unknown          = 0x00FF,  // -40 trust ✗\n}\n// Signed by source entity private key\n// Logged to hash-chained audit record forever`, 
    note: "An ML inference service that suddenly declares ControlSignal is immediately flagged." 
  },
  4: { 
    detailTitle: "AI Trust Evaluation — Gemini 2.5 Flash in <5ms", 
    code: `// Context sent to Gemini 2.5 Flash:\n{\n  "entity_id":           "a4f3c2b1...",\n  "entity_age_days":     312,\n  "intent":              "ModelInference",\n  "is_new_peer":         false,\n  "trust_score_baseline": 218.4,\n  "anomaly_flags":       [],\n  "recent_sessions":     50\n}\n// Gemini responds:\n{\n  "trust_score": 221,\n  "verdict": "Allow",\n  "reasoning": "Established entity, consistent pattern..."\n}`, 
    note: "Hybrid scoring: S_merged = 0.4 × S_rules + 0.6 × S_AI. Never fails open — rules engine always has a floor." 
  },
  5: { 
    detailTitle: "eBPF Enforcement — atomic kernel operation", 
    code: `// Allow: insert into BPF hashmap\nPERMIT_MAP.insert(session_id, permit, 0)?;\n// → next packet: XDP_PASS in <1μs\n\n// Deny: nothing inserted\n// → next packet: XDP_DROP in <1μs (no permit found)\n\n// Revoke: remove from BPF hashmap\nPERMIT_MAP.remove(&session_id)?;\n// → next packet: XDP_DROP in <1μs\n\n// Total revocation latency: sub-microsecond`, 
    note: "The application layer never received the denied packet. Not blocked. Not filtered. Never arrived." 
  }
}

const selectedStageData = computed(() => selectedStage.value ? stageDetails[selectedStage.value] : null)

const selectStage = (n: number) => {
  if (selectedStage.value === n) {
    selectedStage.value = null
  } else {
    selectedStage.value = n
  }
}

// Terminal Ticker
const tickerLines = ref<{time: string, content: string}[]>([])
const tickerRaw = [
  '<span style="color:var(--green-primary)">ALLOW</span>  entity:a4f3c2b1 → ml-cluster-01  intent:ModelInference  score:218  2.1ms',
  '<span style="color:var(--green-primary)">ALLOW</span>  entity:b7d2e8f4 → api-gateway-03  intent:DataSync        score:201  1.9ms',
  '<span style="color:#ff4444">DENY </span>  entity:c9f1a3b2 → finance-db-01   intent:DataSync        score:18   NewPeer anomaly',
  '<span style="color:var(--green-primary)">ALLOW</span>  entity:d4e5c7a8 → analytics-svc   intent:Telemetry       score:234  1.7ms',
  '<span style="color:#ff8800">ALERT</span>  entity:c9f1a3b2 quarantined — lateral movement detected — 0 sessions killed',
  '<span style="color:var(--green-primary)">ALLOW</span>  entity:e2b6d9f1 → ml-cluster-02   intent:ModelInference  score:209  2.3ms',
  '<span style="color:#ff4444">DENY </span>  entity:f7a3c8d5 → finance-db-01   intent:ControlSignal   score:42   intent:risk -25',
  '<span style="color:var(--green-primary)">ALLOW</span>  entity:a4f3c2b1 → ml-cluster-01   intent:Heartbeat       score:240  0.8ms',
]
let tickerIdx = 0
let tickerInterval: any = null

const addTickerLine = () => {
  const line = {
    time: new Date().toISOString().slice(11, 19),
    content: tickerRaw[tickerIdx % tickerRaw.length]
  }
  tickerLines.value.push(line)
  if (tickerLines.value.length > 6) tickerLines.value.shift()
  tickerIdx++
}

// Capability cards
const capabilities = [
  { label: 'SENTINEL ENGINE', value: '<5', unit: 'ms', desc: 'Anomaly detection latency. Event-driven. Not a 30-second scanner. Lateral movement detected before the next packet.', footer: '7 anomaly classes · DashMap baseline cache · ReAct threat agent' },
  { label: 'EBPF ENFORCEMENT', value: '<1', unit: 'μs', desc: 'Session revocation at the kernel driver level via XDP. Not a firewall rule. Not an ACL. A BPF hashmap atomic delete.', footer: 'Linux 5.15+ · CO-RE · Software fallback on macOS' },
  { label: 'TRUST ENGINE', value: '131', unit: '✓', desc: 'Automated tests passing. Gemini 2.5 Flash. Hybrid scoring: 40% deterministic rules + 60% AI reasoning. Never fails open.', footer: 'P50: 2.1ms · P99: 4.9ms · LRU cache · mimalloc allocator' },
]

onMounted(() => {
  addTickerLine()
  tickerInterval = setInterval(addTickerLine, 1800)
})

onUnmounted(() => {
  if (tickerInterval) clearInterval(tickerInterval)
})
</script>

<style scoped>
.pricing-section {
  padding: 80px 0;
  background: #050A05; /* Slightly darker to differentiate from product */
  position: relative;
  border-top: 1px solid rgba(0, 255, 159, 0.1);
  overflow: hidden;
}
.product-section {
  padding: 120px 0;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.label-wrapper { text-align: center; margin-bottom: 24px; }
.section-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--green-primary);
  border: 1px solid var(--border-subtle);
  padding: 6px 16px;
  border-radius: 4px;
}

.text-center { text-align: center; }
.section-desc {
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 auto 80px;
  font-size: 16px;
  line-height: 1.6;
}

.kill-chain-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.kill-chain-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  position: relative;
  z-index: 2;
}

.kc-stage {
  padding: 32px 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.kc-stage.active {
  border-color: var(--green-bright);
  box-shadow: var(--glow-md), inset 0 0 20px var(--green-ghost);
  z-index: 3;
}

.stage-id {
  font-size: 11px;
  color: var(--green-primary);
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.stage-icon { font-size: 28px; margin-bottom: 12px; }
.stage-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}
.stage-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Detail Panel */
.detail-panel {
  margin-top: 16px;
  border-top: 2px solid var(--green-bright);
}

.detail-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  padding: 32px;
  flex-wrap: wrap;
}

.detail-info { flex: 1; min-width: 280px; }
.stage-header {
  font-size: 11px;
  color: var(--green-primary);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
.detail-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}
.detail-note {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  padding: 16px;
  background: var(--bg-void);
  border-left: 2px solid var(--green-primary);
}

.detail-code-wrapper { flex: 1.5; min-width: 300px; width: 100%; }
.detail-code {
  background: var(--bg-void);
  padding: 24px;
  font-size: 12px;
  color: var(--green-primary);
  overflow-x: auto;
  line-height: 1.7;
  margin: 0;
  border-radius: 4px;
}

/* Terminal */
.terminal-container {
  margin-top: 48px;
  background: var(--bg-void);
  border: 1px solid var(--border-subtle);
  padding: 24px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.terminal-header {
  color: var(--green-primary);
  margin-bottom: 16px;
  font-size: 13px;
}

.terminal-ticker {
  color: var(--text-secondary);
  line-height: 2;
  font-size: 13px;
}

.ticker-time {
  color: rgba(0, 255, 159, 0.3);
  margin-right: 12px;
}

/* Capabilities */
.capability-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 64px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.cap-card {
  padding: 40px 32px;
}

.cap-label {
  font-size: 11px;
  color: var(--green-primary);
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.cap-value {
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 8px;
}

.cap-unit { font-size: 24px; vertical-align: baseline; }

.cap-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.cap-footer {
  font-size: 11px;
  color: var(--text-dim);
  border-top: 1px solid var(--border-subtle);
  padding-top: 16px;
}

/* Animations */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.4s ease-out;
  max-height: 1000px;
  opacity: 1;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .kill-chain-grid { grid-template-columns: 1fr; }
  .capability-grid { grid-template-columns: 1fr; }
  .detail-content { padding: 20px; }
  .kc-stage { border-right-width: 1px; }
}
</style>
