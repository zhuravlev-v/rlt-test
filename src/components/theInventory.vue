<template>
  <table 
    class="inventory"
    @dragstart="onDragstart" 
    @dragenter.prevent 
    @dragover.prevent
    @drop="onDrop($event)"
  >
    <tbody>
      <tr v-for="row of rowsState.rows">
        <InventoryCell v-for="cell of row" :item="cell" @onItem="onItem" />
      </tr>
    </tbody>
    <InventoryModal :item="item" :isActive="modalActive" @onClose="onCloseInventoryModal"
      @onConfirm="onConfirmInventoryModal" />
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import InventoryCell from './InventoryCell.vue';
import InventoryModal from './InventoryModal.vue';
import type { Iitem, IitemEmpty } from '@/types'
import { useRowsStore } from '@/stores/rows'

const rowsState = useRowsStore()
const item: Ref<Iitem | IitemEmpty> = ref({
  id: 0,
  data: null
})
const modalActive = ref(false)

const onItem = (newItem: Iitem) => {
  modalActive.value = true
  item.value = newItem
}

const onCloseInventoryModal = () => {
  modalActive.value = false
}

const onConfirmInventoryModal = (item: Iitem) => {
  console.log(item)
  rowsState.deleteItem(item)
}

const onDragstart = (event: DragEvent) => {
  console.log('onDragstart')
  onCloseInventoryModal()
}

const onDrop = (event: DragEvent) => {
  const itemId = Number(event.dataTransfer?.getData('itemId'))
  rowsState.moveItem(itemId, event)
}
</script>

<style lang='scss' scoped>
.inventory {
  width: 100%;
  height: 100%;
  background-color: #262626;
  border-radius: 12px;
  border-spacing: 0;
  border: 1px solid #4D4D4D;
  position: relative;

  &:deep() {
    & tr:first-child {
      & td:first-child {
        border-top-left-radius: 12px;
      }

      & td:last-child {
        border-top-right-radius: 12px;
      }
    }

    & tr:last-child {
      & td:first-child {
        border-bottom-left-radius: 12px;
      }

      & td:last-child {
        border-bottom-right-radius: 12px;
      }
    }
  }
}
</style>