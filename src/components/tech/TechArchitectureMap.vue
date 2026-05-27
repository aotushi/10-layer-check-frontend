<script setup lang="ts">
import { systemDomains } from '@/content/techPage'
</script>

<template>
  <section class="domain-section">
    <div class="page-inner domain-section__grid">
      <div class="domain-section__intro">
        <p>Architecture domains</p>
        <h2>What each part of the system owns</h2>
        <span>
          The page separates product runtime concerns from implementation concerns: frontend
          presentation, backend orchestration, data/reporting, and operations quality.
        </span>
      </div>

      <div class="domain-board">
        <article v-for="domain in systemDomains" :key="domain.title" class="domain-card">
          <div>
            <h3>{{ domain.title }}</h3>
            <p>{{ domain.subtitle }}</p>
          </div>
          <ul>
            <li v-for="item in domain.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.domain-section {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: var(--section-y) var(--page-gutter);
}

.domain-section__grid {
  display: grid;
  gap: 38px;
  grid-template-columns: minmax(240px, 0.36fr) minmax(0, 1fr);
}

.domain-section__intro {
  position: sticky;
  top: 96px;
  align-self: start;
}

.domain-section__intro p {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.domain-section__intro h2 {
  margin: 0;
  color: var(--ink);
  font-size: 28px;
  line-height: 1.2;
}

.domain-section__intro span {
  display: block;
  margin-top: 16px;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.6;
}

.domain-board {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.domain-card {
  display: grid;
  gap: 16px;
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 18px;
}

.domain-card h3 {
  margin: 0;
  color: var(--ink);
  font-size: 18px;
}

.domain-card p {
  margin: 8px 0 0;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.domain-card ul {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.domain-card li {
  border-top: 1px solid var(--border-hairline);
  padding-top: 9px;
  color: var(--ink-secondary);
  font-size: 13px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .domain-section__grid {
    grid-template-columns: 1fr;
  }

  .domain-section__intro {
    position: static;
  }
}

@media (max-width: 640px) {
  .domain-board {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .domain-section {
    padding-block: 26px;
  }

  .domain-section__grid {
    gap: 16px;
  }

  .domain-section__intro h2 {
    font-size: 22px;
  }

  .domain-section__intro span {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.45;
  }

  .domain-board {
    gap: 8px;
  }

  .domain-card {
    gap: 10px;
    padding: 10px;
  }

  .domain-card h3 {
    font-size: 15px;
  }

  .domain-card p {
    margin-top: 5px;
  }

  .domain-card ul {
    gap: 5px;
  }

  .domain-card li {
    display: -webkit-box;
    overflow: hidden;
    padding-top: 5px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 12px;
  }

  .domain-card li:nth-child(n + 3) {
    display: none;
  }
}
</style>
