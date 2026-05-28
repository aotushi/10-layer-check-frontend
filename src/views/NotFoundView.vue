<template>
  <main class="not-found-page" aria-labelledby="not-found-title">
    <section class="not-found-page__panel">
      <p class="not-found-page__kicker">404</p>
      <h1 id="not-found-title">Page not found</h1>
      <p>This address is not part of the public site or the signed-in diagnostic workspace.</p>
      <div class="not-found-page__actions">
        <RouterLink class="not-found-page__primary" to="/">Home</RouterLink>
        <RouterLink class="not-found-page__secondary" to="/10-layer-model">
          10-layer model
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.not-found-page {
  display: grid;
  min-height: calc(100vh - 58px);
  place-items: center;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--canvas-muted) 72%, white), transparent 1px) 0
      0 / 36px 36px,
    var(--canvas);
  padding: 48px var(--page-gutter);
}

.not-found-page__panel {
  width: min(100%, 760px);
  border: 1px solid var(--border-hairline);
  border-left: 4px solid var(--primary);
  background: var(--canvas);
  padding: clamp(28px, 5vw, 46px);
}

.not-found-page__kicker {
  margin: 0 0 10px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.not-found-page h1 {
  max-width: 620px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(38px, 6vw, 64px);
  line-height: 0.95;
}

.not-found-page p {
  max-width: 560px;
  margin: 18px 0 0;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 1.55;
}

.not-found-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.not-found-page__actions a {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary);
  padding: 0 18px;
  font-size: 13px;
  font-weight: 800;
}

.not-found-page__primary {
  background: var(--primary);
  color: var(--ink-inverse);
}

.not-found-page__secondary {
  background: var(--canvas);
  color: var(--primary);
}

@media (max-width: 560px) {
  .not-found-page {
    min-height: calc(100vh - 48px);
    place-items: start;
    padding-block: 28px;
  }

  .not-found-page__actions {
    display: grid;
  }
}
</style>
