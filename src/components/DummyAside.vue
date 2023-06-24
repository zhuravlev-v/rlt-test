<template>
  <div class="aside">
    <img class="image" src="@/assets/images/image-blur.jpg" alt="">
    <img class="skeleton" src="@/assets/images/skeletons.png" alt="">
  </div>
</template>

<style lang='scss' scoped>
.aside {
  display: flex;
  padding: 18px 14px 24px 14px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid #4D4D4D;
  background-color: #262626;
  height: 100%;
  box-sizing: border-box;
}

.image {
  border-radius: 8px;
}

.skeleton {}
</style>