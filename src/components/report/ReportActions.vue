<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="report-actions" aria-labelledby="report-actions-title">
    <div>
      <p>Next action</p>
      <h2 id="report-actions-title">Review the evidence before changing policy</h2>
      <span>
        The report separates observed facts, risk signals, and missing data so follow-up work can be
        scoped without overclaiming.
      </span>
    </div>
    <div class="report-actions__links">
      <RouterLink to="/">Run another scan</RouterLink>
      <a href="#top">Back to report top</a>
    </div>
  </section>
</template>

<style scoped>
.report-actions {
  display: grid;
  align-items: center;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) auto;
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 24px;
}

.report-actions p {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.report-actions h2 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.15;
}

.report-actions span {
  display: block;
  max-width: 680px;
  margin-top: 10px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.55;
}

.report-actions__links {
  display: flex;
  gap: 10px;
}

.report-actions__links a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-strong);
  background: var(--canvas);
  color: var(--ink);
  padding: 0 16px;
  font-size: 13px;
  font-weight: 800;
}

.report-actions__links a:first-child {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--ink-inverse);
}

@media (max-width: 760px) {
  .report-actions {
    grid-template-columns: 1fr;
    padding: 18px;
  }

  .report-actions__links {
    flex-wrap: wrap;
  }

  .report-actions__links a {
    flex: 1;
  }
}
</style>
