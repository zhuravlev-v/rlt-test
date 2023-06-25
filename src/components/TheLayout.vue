<template>
  <div class="layout">
    <aside class="aside">
      <slot name="aside"></slot>
    </aside>
    <main class="main">
      <slot name="main"></slot>
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

</script>

<style lang='scss' scoped>
.layout {
  width: 100%;
  max-width: 785px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 236px 525px;
  gap: 24px;
}

.aside {
  grid-column: 1;
}

.main {
  grid-column: 2/3;
  grid-row: 1;
  overflow: hidden;
}

.footer {
  grid-column: 1/-1;
  grid-row: 2;
}
</style>