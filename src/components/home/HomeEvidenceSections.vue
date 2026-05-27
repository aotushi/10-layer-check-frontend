<script setup lang="ts">
import { anomalies, evidenceLines, trustBadges } from '@/content/homePage'
</script>

<template>
  <section class="evidence-section evidence-section--muted">
    <div class="page-inner">
      <h2 class="section-title">Evidence-based reporting</h2>
      <p class="section-lead">
        Every diagnostic finding is backed by inspectable public response evidence. The report shows
        the captured lines that support each status.
      </p>
      <pre class="evidence-block"><code><span
        v-for="line in evidenceLines"
        :key="line.text"
        :class="`evidence-block__line evidence-block__line--${line.tone}`"
      >{{ line.text }}
</span></code></pre>
    </div>
  </section>

  <section class="evidence-section evidence-section--canvas">
    <div class="page-inner">
      <h2 class="section-title section-title--center">Common anomalies detected</h2>
      <div class="anomaly-grid">
        <article v-for="item in anomalies" :key="item.title" class="anomaly-card">
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <code>{{ item.impact }}</code>
        </article>
      </div>
    </div>
  </section>

  <section class="evidence-section evidence-section--soft">
    <div class="page-inner trust-panel">
      <h2 class="section-title section-title--center">Low-impact public observation.</h2>
      <p>
        The diagnostic engine operates strictly within public boundaries. It relies on public HTTP,
        DNS, and browser-observable responses. No intrusive payloads, no brute-forcing, minimal
        operational footprint.
      </p>
      <div class="trust-badges">
        <span v-for="badge in trustBadges" :key="badge">{{ badge }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.evidence-section {
  border-bottom: 1px solid var(--border-hairline);
  padding: var(--home-section-y, var(--section-y)) var(--page-gutter);
}

.evidence-section--muted {
  background: var(--canvas-muted);
}

.evidence-section--canvas {
  background: var(--canvas);
}

.evidence-section--soft {
  background: color-mix(in srgb, var(--soft-primary) 34%, var(--canvas));
}

.section-title {
  margin: 0 0 20px;
  color: var(--ink);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
}

.section-title--center {
  text-align: center;
}

.section-lead {
  max-width: 720px;
  margin: 0 0 32px;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 1.7;
}

.evidence-block {
  overflow-x: auto;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  margin: 0;
  padding: 20px;
  color: var(--ink);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
  line-height: 1.65;
}

.evidence-block__line {
  display: block;
  min-width: max-content;
}

.evidence-block__line--danger {
  display: inline-block;
  background: color-mix(in srgb, var(--danger) 10%, var(--canvas));
  color: var(--danger);
}

.evidence-block__line--neutral:first-child {
  color: var(--ink-muted);
}

.anomaly-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.anomaly-card {
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 24px;
}

.anomaly-card strong {
  display: block;
  color: var(--warning);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.anomaly-card p {
  margin: 14px 0 18px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.65;
}

.anomaly-card code {
  display: block;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 10px;
  color: var(--ink-secondary);
  font-size: 12px;
}

.trust-panel {
  text-align: center;
}

.trust-panel p {
  max-width: 720px;
  margin: 0 auto 28px;
  color: var(--ink-secondary);
  font-size: 18px;
  line-height: 1.65;
}

.trust-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.trust-badges span {
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  padding: 8px 12px;
  color: var(--ink-secondary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .anomaly-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .evidence-section {
    padding-block: var(--home-section-y, 28px);
  }

  .section-title {
    margin-bottom: 12px;
    font-size: 20px;
  }

  .section-lead {
    margin-bottom: 14px;
    font-size: 12px;
    line-height: 1.45;
  }

  .evidence-block {
    padding: 12px;
    font-size: 11px;
    line-height: 1.45;
  }

  .evidence-block__line:nth-child(n + 6) {
    display: none;
  }

  .anomaly-grid {
    gap: 8px;
  }

  .anomaly-card {
    padding: 12px;
  }

  .anomaly-card strong {
    font-size: 10px;
    letter-spacing: 0.03em;
  }

  .anomaly-card p {
    margin: 8px 0;
    font-size: 12px;
    line-height: 1.4;
  }

  .anomaly-card code {
    padding: 7px;
    font-size: 10px;
  }

  .trust-panel p {
    display: none;
  }

  .trust-badges {
    gap: 6px;
  }

  .trust-badges span {
    padding: 6px 8px;
    font-size: 9px;
    letter-spacing: 0.02em;
  }
}
</style>
