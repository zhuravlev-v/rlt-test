<template>
  <td ref="cell" :id="id" class="cell" v-if="!item.data">
    <!-- {{ `${item.data}` }} -->
  </td>
  <td 
    v-else
    ref="cell"
    :id="id"
    @click="onClick(item)" 
    @dragstart="onDragstart($event, item)" 
    @pointerup="onPointerup($event, item)"
    draggable="true" 
    class="cell cell-filled"
  >
    <img class="item" :src="getImageUrl(item.data?.icon)" alt="" draggable="false">
    <span class="item-count">{{ item.data?.count }}</span>
  </td>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Iitem, IitemEmpty } from '@/types'

const props = defineProps<{
  item: Iitem | IitemEmpty
}>()

const emit = defineEmits<{
  onItem: [item: Iitem]
}>()

// TODO: repeat. id: 1
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/item-${name}.png`, import.meta.url).href
}

const onClick = (item: Iitem) => {
  emit('onItem', item)
}

// TODO: typing event
const onDragstart = (event, item: Iitem) => {
  // event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.dropEffect = "copy"
  // event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.effectAllowed = "copyMove"
  event.dataTransfer.setData('itemId', item.id)
}

const onPointerup = (event, item) => {
  console.log(event)
  console.log(item)
}

const cell = ref(null)

const id = computed(() => {
  return props.item.id + ''
})

onMounted(() => {
  // console.log(cell.value)
  // console.log(props.item.id)
  // cell.value.id = props.item.id
})

</script>

<style lang='scss' scoped>
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