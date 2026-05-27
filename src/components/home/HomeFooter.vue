<script setup lang="ts">
const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/10-layer-model', label: '10-layer model' },
  { to: '/tech', label: 'Tech' },
  { to: '/login', label: 'Login' },
]
</script>

<template>
  <footer class="home-footer">
    <div class="page-inner home-footer__grid">
      <div>
        <strong>10-Layer Check</strong>
        <p>Engineering-grade public reconnaissance for technical teams.</p>
        <p>© 2026 10-Layer Check. Engineering-grade diagnostics.</p>
      </div>
      <nav aria-label="Footer navigation">
        <RouterLink v-for="link in footerLinks" :key="link.to" :to="link.to">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.home-footer {
  border-top: 1px solid var(--border-strong);
  background: var(--canvas-muted);
  padding: 32px var(--page-gutter);
}

.home-footer__grid {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) auto;
}

.home-footer strong {
  display: block;
  margin-bottom: 16px;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-footer p {
  margin: 0 0 8px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.home-footer nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 24px;
}

.home-footer a {
  color: var(--ink-secondary);
  font-size: 14px;
}

.home-footer a:hover {
  color: var(--primary);
  text-decoration: underline;
}

@media (max-width: 760px) {
  .home-footer__grid {
    grid-template-columns: 1fr;
  }

  .home-footer nav {
    justify-content: flex-start;
  }
}

@media (max-width: 560px) {
  .home-footer {
    padding: 20px var(--page-gutter);
  }

  .home-footer__grid {
    gap: 14px;
  }

  .home-footer strong {
    margin-bottom: 8px;
  }

  .home-footer p {
    font-size: 12px;
    line-height: 1.4;
  }

  .home-footer p:first-of-type {
    display: none;
  }

  .home-footer nav {
    gap: 12px;
  }

  .home-footer a {
    font-size: 12px;
  }
}
</style>
