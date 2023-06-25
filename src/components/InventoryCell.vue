<template>
  <td v-if="!item.data" ref="cell" :id="id" class="cell"></td>
  <td 
    v-else 
    ref="cell" 
    :id="id"
    @click="onClick(item)" 
    @dragstart="onDragstart($event, item)" 
    @dragenter.prevent @dragover.prevent 
    draggable="true"
    class="cell cell-filled"
  >
    <img class="item" :src="getImageUrl(item.data?.icon)" alt="" draggable="false">
    <span class="item-count">{{ item.data?.count }}</span>
  </td>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Iitem, IitemEmpty } from '@/types'

const props = defineProps<{
  item: Iitem | IitemEmpty
}>()

const emit = defineEmits<{
  onItem: [item: Iitem]
}>()

const getImageUrl = (name: string) => {
  return new URL(`../assets/images/item-${name}.png`, import.meta.url).href
}

const onClick = (item: Iitem) => {
  emit('onItem', item)
}

const onDragstart = (event: DragEvent, item: Iitem) => {
  if (event.dataTransfer?.dropEffect) {
    event.dataTransfer.dropEffect = 'move'
  }
  if (event.dataTransfer?.effectAllowed) {
    event.dataTransfer.effectAllowed = 'move'
  }
  event.dataTransfer?.setData('itemId', String(item.id))

  // if (event.dataTransfer) {
  //   const div = document.createElement('div')
  //   div.classList.add('cell-filled')
  //   const img = new Image()
  //   img.classList.add('item')
  //   div.appendChild(img)
  //   event.dataTransfer.setDragImage(div, 0, 0)
  // }

}

const cell = ref(null)

const id = computed(() => {
  return props.item.id + ''
})

</script>

<style lang='scss' scoped>
@mixin grab-cursor {
  cursor: url('https://www.google.com/intl/en_ALL/mapfiles/openhand.cur'), all-scroll;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: -o-grab;
  cursor: -ms-grab;
  cursor: grab;
}

@mixin grabbing-cursor {
  cursor: url('https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur'), all-scroll;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: -o-grabbing;
  cursor: -ms-grabbing;
  cursor: grabbing;
}

.cell {
  border: 1px solid #4D4D4D;
  width: 100px;
  height: 100px;
  vertical-align: middle;
  text-align: center;
  position: relative;
}

.cell-filled {
  cursor: pointer;
  z-index: 2;
  @include grab-cursor;
  transition: all 0.2s ease;

  &:hover {
    background: #2F2F2F;
  }

  &:active {
    @include grabbing-cursor;
    border-radius: 24px;
  }
}

.item {
  width: 54px;
  height: 54px;
}

.item-count {
  font-size: 10px;
  font-family: Inter;
  font-weight: 500;
  color: #FFFFFF;
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  padding: 2px 4px;
  border-top: 1px solid #4D4D4D;
  border-left: 1px solid #4D4D4D;
  border-top-left-radius: 6px;
}
</style>