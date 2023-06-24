<template>
  <TheLayout>
    <template #aside>
      <DummyAside />
    </template>
    <template #main>
      <theInventory />
    </template>
    <template #footer>
      <DummyFooter />
    </template>
  </TheLayout>
</template>

<script setup lang="ts">
import TheLayout from './components/TheLayout.vue';
import DummyAside from './components/DummyAside.vue';
import DummyFooter from './components/DummyFooter.vue';
import theInventory from './components/theInventory.vue';
</script>

<style scoped>
</style>
