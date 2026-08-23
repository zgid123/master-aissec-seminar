<template>
  <div class="slide-page-number" aria-label="Slide number">
    <SlideCurrentNo /> / <SlidesTotal />
  </div>
</template>

<style scoped>
.slide-page-number {
  position: absolute;
  right: 1rem;
  bottom: 0.65rem;
  z-index: 50;
  padding: 0.18rem 0.42rem;
  border: 1px solid rgba(136, 255, 255, 0.22);
  border-radius: 0.35rem;
  background: rgba(5, 15, 25, 0.72);
  color: rgba(136, 255, 255, 0.9);
  font-family: "Roboto Mono", monospace;
  font-size: 0.55rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.06em;
  pointer-events: none;
}
</style>
