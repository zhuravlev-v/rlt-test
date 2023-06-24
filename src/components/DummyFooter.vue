<template>
  <div class="footer" v-if="isVisible">
    <img class="skeleton" src="@/assets/images/skeleton-footer.png" alt="">
    <button @click="close" class="close-btn">
      <img class="close-btn__img" src="@/assets/images/close.svg" alt="close">
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)

const close = () => {
  isVisible.value = false
}

</script>

<style lang='scss' scoped>
.footer {
  border-radius: 12px;
  border: 1px solid #4D4D4D;
  background: #262626;
  padding: 18px 68px 18px 18px;
  position: relative;
}

.skeleton {
  width: 100%;
  height: 36px;
}

.close-btn {
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
}

.close-btn__img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>