<template>
  <!-- PRICING SECTION -->
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="text-center">
        <div class="section-label">[ PRICING ]</div>
        <h2 class="section-title">
          Transparent pricing.<br>
          <span style="color:var(--green-primary);">Start free. Scale with confidence.</span>
        </h2>
        <p class="section-sub">
          Every tier includes Ed25519 identity verification, Gemini 2.5 trust evaluation,
          and Sentinel continuous monitoring. No hidden costs. No lock-in.
        </p>
      </div>

      <div class="pricing-grid">
        <!-- FREE / OPEN SOURCE -->
        <div class="price-card glass-panel">
          <div class="price-tier-label">FREE & OPEN SOURCE</div>
          <div class="price-amount">$0</div>
          <div class="price-inr">₹0 / forever</div>
          <div class="price-desc">
            Full source code on GitHub. Self-host with your own Gemini API key.
            Perfect for developers, researchers, and security teams evaluating Kelan.
          </div>
          <div class="price-features">
            <div class="price-feat">● Up to 5 nodes</div>
            <div class="price-feat">● SQLite database</div>
            <div class="price-feat">● Gemini 2.5 trust evaluation</div>
            <div class="price-feat">● Sentinel monitoring</div>
            <div class="price-feat">● Community support (GitHub Issues)</div>
            <div class="price-feat" style="color:#6B7A6B;">○ Non-commercial use (BSL 1.1)</div>
          </div>
          <a href="https://github.com/Kelan-Security/kelan-core"
             target="_blank" rel="noopener noreferrer"
             class="price-btn price-btn-outline">
            View on GitHub →
          </a>
        </div>

        <!-- STARTUP -->
        <div class="price-card glass-panel">
          <div class="price-tier-label">STARTUP</div>
          <div class="price-amount">$499</div>
          <div class="price-inr">₹41,500 / month</div>
          <div class="price-desc">
            Commercial license for growing teams. Postgres support, webhooks,
            and email support included. Up to 50 enrolled nodes.
          </div>
          <div class="price-features">
            <div class="price-feat">● Up to 50 nodes</div>
            <div class="price-feat">● PostgreSQL support</div>
            <div class="price-feat">● Gemini 2.5 trust evaluation</div>
            <div class="price-feat">● Sentinel + Threat agent</div>
            <div class="price-feat">● Webhook integrations</div>
            <div class="price-feat">● Email support (48h SLA)</div>
          </div>
          <a href="mailto:team@kelan.io?subject=Startup plan inquiry"
             class="price-btn price-btn-outline">
            Contact us →
          </a>
        </div>

        <!-- ENTERPRISE — featured -->
        <div class="price-card glass-panel price-card-featured">
          <div class="price-featured-badge">MOST POPULAR</div>
          <div class="price-tier-label" style="color:var(--green-primary);">ENTERPRISE</div>
          <div class="price-amount">$2,000</div>
          <div class="price-inr">₹1,66,500 / month</div>
          <div class="price-desc">
            Unlimited scale. Air-gap mode, SSO, custom retention, and a dedicated
            customer success manager. For organisations where security is non-negotiable.
          </div>
          <div class="price-features">
            <div class="price-feat" style="color:var(--green-primary);">● Unlimited nodes</div>
            <div class="price-feat" style="color:var(--green-primary);">● PostgreSQL + air-gap mode</div>
            <div class="price-feat" style="color:var(--green-primary);">● SSO (SAML / OIDC)</div>
            <div class="price-feat" style="color:var(--green-primary);">● Custom retention policies</div>
            <div class="price-feat" style="color:var(--green-primary);">● Priority support (4h SLA)</div>
            <div class="price-feat" style="color:var(--green-primary);">● Dedicated CSM</div>
          </div>
          <a href="mailto:team@kelan.io?subject=Enterprise plan inquiry"
             class="price-btn price-btn-primary">
            Contact us →
          </a>
        </div>

        <!-- DEFENSE -->
        <div class="price-card glass-panel">
          <div class="price-tier-label">DEFENSE</div>
          <div class="price-amount">Custom</div>
          <div class="price-inr">Annual contract</div>
          <div class="price-desc">
            Full air-gap deployment, FIPS 140-2 compliant mode, clearance-level
            gating, and source code escrow. Built for classified environments.
          </div>
          <div class="price-features">
            <div class="price-feat">● Unlimited nodes</div>
            <div class="price-feat">● Full air-gap (local LLM)</div>
            <div class="price-feat">● FIPS 140-2 compliance mode</div>
            <div class="price-feat">● Clearance-level enforcement</div>
            <div class="price-feat">● Source code escrow</div>
            <div class="price-feat">● Dedicated deployment support</div>
          </div>
          <a href="mailto:team@kelan.io?subject=Defense deployment inquiry"
             class="price-btn price-btn-outline">
            Talk to us →
          </a>
        </div>
      </div>

      <!-- Pilot offer -->
      <div class="pilot-strip glass-panel">
        <div>
          <div class="pilot-title">Not ready to commit? Run a free 90-day Enterprise pilot.</div>
          <div class="pilot-sub">Full Enterprise features. No credit card required. We help you set it up.</div>
        </div>
        <a href="mailto:team@kelan.io?subject=90-day pilot request" class="price-btn price-btn-primary">
          Request pilot →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  padding: 120px 0;
  background: transparent;
  position: relative;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1300px;
  margin: 0 auto;
}

.price-card {
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
}

.price-card-featured {
  border: 1px solid var(--green-bright);
  box-shadow: var(--glow-md), var(--glass-shadow);
}

.price-featured-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green-primary);
  color: #000;
  font-family: monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 12px;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.price-tier-label {
  font-family: monospace;
  font-size: 11px;
  color: #6B7A6B;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
}

.price-amount {
  font-size: 48px;
  font-weight: 900;
  color: #FFF;
  line-height: 1;
  margin-bottom: 4px;
}

.price-inr {
  font-family: monospace;
  font-size: 12px;
  color: #6B7A6B;
  margin-bottom: 24px;
}

.price-desc {
  font-size: 14px;
  color: #6B7A6B;
  line-height: 1.6;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 255, 159,0.1);
  flex-grow: 1;
}

.price-features {
  margin-bottom: 32px;
}

.price-feat {
  font-size: 13px;
  color: #6B7A6B;
  line-height: 2.2;
}

.price-btn {
  display: block;
  text-align: center;
  padding: 14px 16px;
  font-family: monospace;
  font-size: 13px;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: all 0.2s;
}

.price-btn-outline {
  border: 1px solid rgba(0, 255, 159,0.35);
  color: var(--green-primary);
  background: transparent;
}

.price-btn-outline:hover {
  background: rgba(0, 255, 159,0.08);
  border-color: var(--green-primary);
}

.price-btn-primary {
  background: var(--green-primary);
  color: #000;
  font-weight: 700;
}

.price-btn-primary:hover {
  background: #2ee010;
  transform: translateY(-1px);
}

.pilot-strip {
  max-width: 1300px;
  margin: 48px auto 0;
  padding: 32px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.pilot-title { font-size: 18px; font-weight: 700; color: #FFF; margin-bottom: 4px; }
.pilot-sub { font-size: 14px; color: #6B7A6B; }

@media (max-width: 1024px) {
  .pricing-grid { grid-template-columns: repeat(2, 1fr); }
  .pilot-strip { flex-direction: column; text-align: center; }
}

@media (max-width: 640px) {
  .pricing-grid { grid-template-columns: 1fr; }
}
</style>
