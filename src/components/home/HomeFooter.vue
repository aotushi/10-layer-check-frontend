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
        <a
          class="home-footer__icon-link"
          href="https://github.com/aotushi/10-layer-check-frontend"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z"
            />
          </svg>
        </a>
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
  align-items: center;
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

.home-footer__icon-link {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
}

.home-footer__icon-link svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.home-footer__icon-link:hover {
  text-decoration: none;
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
