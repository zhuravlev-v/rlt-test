<template>
  <div :class="['modal', { modal_shown: isActive }]">
    <button @click="onClose" class="close-btn">
      <img class="close-btn__img" src="@/assets/images/close.svg" alt="close">
    </button>
    <div class="image-wrapper">
      <img class="image" :src="getImageUrl(item.data?.icon)" alt="">
    </div>
    <div class="skeleton">
      <img class="skeleton-image" src="@/assets/images/skeletons-modal.png" alt="">
    </div>
    <button @click="onDelete" class="btn-delete">Удалить предмет</button>
    <div :class="['modal-confirm', { 'modal-confirm_shown': step === 2 }]">
      <input v-model.number="countDelete" type="number" placeholder="Введите количество" class="input-count-delete">
      <button @click="onCancel" class="btn-cancel">Отмена</button>
      <button @click="onConfirm" class="btn-confirm">Подтвердить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Iitem, IitemEmpty } from '@/types'

const step = ref(1)
const countDelete: Ref<number | string> = ref('')

const props = defineProps<{
  item: Iitem | IitemEmpty,
  isActive: boolean,
}>()

const emit = defineEmits<{
  onClose: [],
  onConfirm: [item: Iitem],
}>()

const onClose = () => {
  emit('onClose')
}

const onDelete = () => {
  step.value = 2
}

const onCancel = () => {
  step.value = 1
  countDelete.value = ''
}

const onConfirm = () => {
  // TODO: zero shouldn't be string, number only
  if (countDelete.value < '0') return
  emit('onConfirm', { ...props.item, countDelete: countDelete.value ?? 0 })
  onCancel()
  onClose()
}

// TODO: repeat. id: 1
const getImageUrl = (name?: string) => {
  if (!name) return ''
  return new URL(`../assets/images/item-${name}.png`, import.meta.url).href
}
</script>

<style lang='scss' scoped>
button {
  cursor: pointer;
}
.modal {
  box-sizing: border-box;
  position: absolute;
  z-index: 20;
  top: 0;
  right: 0;
  padding: 55px 15px 18px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  width: 250px;
  height: 100%;
  border-left: 1px solid #4D4D4D;
  background: rgba(38, 38, 38, 0.50);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease;
  transform: translateX(100%);
}

.modal_shown {
  transform: translate(0%);
}

.image-wrapper {
  text-align: center;
  padding-bottom: 30px;
  margin-bottom: 16px;
  border-bottom: 1px solid #4D4D4D;
}

.image {
  width: 130px;
  height: 130px;
}

.skeleton {
  text-align: center;
  padding-bottom: 24px;
  margin-bottom: 18px;
  border-bottom: 1px solid #4D4D4D;
}

.skeleton-image {}

.btn-delete {
  border-radius: 8px;
  background: #FA7272;
  color: #FFFFFF;
  text-align: center;
  font-size: 14px;
  // font-family: 'SF Pro Display';
  font-family: 'Inter';
  border: none;
  padding: 11px;
  width: 100%;
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

.modal-confirm {
  border-top: 1px solid #4D4D4D;
  background: rgba(38, 38, 38, 0.60);
  backdrop-filter: blur(8px);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 21px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 41% 59%;
  row-gap: 20px;
  column-gap: 10px;
  transition: transform 0.4s ease;
  transform: translateY(100%);
  
  &_shown {
    transform: translateY(0%);
  }
}

.input-count-delete {
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #4D4D4D;
  background: transparent;
  padding: 12px;
  color: #FFF;
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  grid-column: span 2;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
}

.btn-cancel {
  border: none;
  grid-column: 1/2;
  padding: 8px;
  font-family: Inter;
  color: #000000;
  border-radius: 8px;
  background: #FFF;
}

.btn-confirm {
  border: none;
  padding: 8px;
  font-family: Inter;
  grid-column: 2/3;
  border-radius: 8px;
  background: #FA7272;
  color: #FFF;
}
</style>