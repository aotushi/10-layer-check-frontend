<script setup lang="ts">
import { systemArchitectureGroups } from '@/content/techPage'
</script>

<template>
  <section class="architecture-section">
    <div class="page-inner architecture-section__grid">
      <div class="architecture-section__intro">
        <p>System architecture map</p>
        <h2>Runtime boundaries behind the pipeline</h2>
        <span>
          This map shows ownership boundaries. The pipeline explains how a request flows; this
          section shows which subsystem owns each responsibility.
        </span>
      </div>

      <div class="architecture-board" aria-label="System architecture ownership map">
        <article
          v-for="group in systemArchitectureGroups"
          :key="group.title"
          class="architecture-card"
        >
          <small>{{ group.zone }}</small>
          <h3>{{ group.title }}</h3>
          <code>{{ group.stack }}</code>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.architecture-section {
  border-bottom: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: var(--section-y) var(--page-gutter);
}

.architecture-section__grid {
  display: grid;
  gap: 34px;
  grid-template-columns: minmax(240px, 0.34fr) minmax(0, 1fr);
}

.architecture-section__intro {
  position: sticky;
  top: 96px;
  align-self: start;
}

.architecture-section__intro p {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.architecture-section__intro h2 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.16;
}

.architecture-section__intro span {
  display: block;
  margin-top: 14px;
  color: var(--ink-secondary);
  font-size: 15px;
  line-height: 1.58;
}

.architecture-board {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.architecture-card {
  display: grid;
  align-content: start;
  gap: 10px;
  border: 1px solid var(--border-hairline);
  background: var(--canvas-soft);
  padding: 14px;
}

.architecture-card small {
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.architecture-card h3 {
  margin: 0;
  color: var(--ink);
  font-size: 17px;
  line-height: 1.22;
}

.architecture-card code {
  border: 1px solid var(--border-hairline);
  background: var(--canvas);
  padding: 7px;
  color: var(--ink-secondary);
  font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  line-height: 1.35;
  white-space: normal;
}

.architecture-card ul {
  display: grid;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.architecture-card li {
  border-top: 1px solid var(--border-hairline);
  padding-top: 7px;
  color: var(--ink-secondary);
  font-size: 12px;
  line-height: 1.38;
}

@media (max-width: 1020px) {
  .architecture-board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .architecture-section__grid {
    grid-template-columns: 1fr;
  }

  .architecture-section__intro {
    position: static;
  }
}

@media (max-width: 560px) {
  .architecture-section {
    padding-block: 26px;
  }

  .architecture-section__grid {
    gap: 16px;
  }

  .architecture-section__intro span {
    margin-top: 9px;
    font-size: 13px;
    line-height: 1.45;
  }

  .architecture-board {
    gap: 8px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .architecture-card {
    gap: 6px;
    padding: 8px;
  }

  .architecture-card h3 {
    font-size: 13px;
  }

  .architecture-card code {
    padding: 6px;
    overflow: hidden;
    font-size: 10px;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .architecture-card ul {
    gap: 4px;
  }

  .architecture-card li {
    display: -webkit-box;
    overflow: hidden;
    padding-top: 4px;
    font-size: 10px;
    line-height: 1.25;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .architecture-card li:nth-child(n + 3) {
    display: none;
  }
}
</style>
