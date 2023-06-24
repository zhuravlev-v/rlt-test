<template>
  <table 
  class="inventory"
  @dragenter.prevent 
  @dragover.prevent
  @drop="onDrop($event)"
  >
    <tbody>
      <tr v-for="row of rows">
        <InventoryCell v-for="cell of row" :item="cell" @onItem="onItem" />
      </tr>
    </tbody>
    <InventoryModal :item="item" :isActive="modalActive" @onClose="onCloseInventoryModal"
      @onConfirm="onConfirmInventoryModal" />
  </table>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { Ref } from 'vue'
import InventoryCell from './InventoryCell.vue';
import InventoryModal from './InventoryModal.vue';
import type { Iitem, IitemEmpty } from '@/types'

// TODO: shouldn't be any
const cells: Ref<any[]> = ref(
  (new Array(25).fill(null)).map((item, index) => {
    return <Iitem | IitemEmpty>(
      {
        id: index,
        data: null
      }
    )
  })
)

cells.value[0] = {
  id: 0,
  data: {
    name: 'lala',
    count: 7,
    icon: 'brown',
  }
}
cells.value[7] = {
  id: 7,
  data: {
    name: 'lala',
    count: 5,
    icon: 'blue',
  }
}
cells.value[23] = {
  id: 23,
  data: {
    name: 'lala',
    count: 12,
    icon: 'blue',
  }
}
cells.value[24] = {
  id: 24,
  data: {
    name: 'lala',
    count: 2,
    icon: 'green',
  }
}

// TODO: can't typing with <(Iitem | IitemEmpty)[][]>
const rows = computed<(Iitem | IitemEmpty)[][]>(() => {
  const rows = [
    new Array(5).fill(null),
    new Array(5).fill(null),
    new Array(5).fill(null),
    new Array(5).fill(null),
    new Array(5).fill(null),
  ]

  let p = 0
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    for (let j = 0; j < row.length; j++) {
      row[j] = cells.value[p]
      p++
    }
  }

  return rows
})

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

const onConfirmInventoryModal = (item: Iitem | IitemEmpty) => {
  console.log(item)
  const exactItem = cells.value.find((cell: Iitem | IitemEmpty) => {
    return cell.id === item.id
  })

  // TODO: handle error
  if (item?.countDelete >= exactItem.data.count) {
    cells.value[item.id] = {
      id: exactItem.id,
      data: null
    }
  }
  else {
    cells.value[item.id] = {
      id: exactItem.id,
      data: {
        ...exactItem.data,
        count: exactItem.data.count - item.countDelete // TODO: handle error
      }
    }
  }
  // console.log(exactItem)
}

// TODO: typing event
const onDrop = (event) => {
  const itemId = Number(event.dataTransfer.getData('itemId'))
  const item = cells.value.find((cell: Iitem) => {
    if (cell.id === undefined) {
      return cell.value.id === itemId
    }
    else {
      return cell.id === itemId
    }
  })
  
  const dropCell = cells.value.find((cell: Iitem) => cell.id === Number(event.target.id))
  if (dropCell.data === null) {
    dropCell.data = item.data
    item.data = null
  }
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
  overflow: hidden;

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