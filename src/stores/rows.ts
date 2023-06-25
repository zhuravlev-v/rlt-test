import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Iitem, IitemEmpty } from '@/types'

export const useRowsStore = defineStore(
  'rows',
  () => {
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

    const deleteItem = (item: Iitem) => {
      const exactItem = cells.value.find((cell: Iitem | IitemEmpty) => {
        return cell.id === item.id
      })

      const countDelete: number = Number(item.countDelete ?? 0)

      if (countDelete >= exactItem.data.count) {
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
            count: exactItem.data.count - countDelete
          }
        }
      }
    }

    const moveItem = (itemId: number, event: DragEvent) => {
      const item = cells.value.find((cell: Iitem) => {
        if (cell.id === undefined) {
          return cell.value.id === itemId
        }
        else {
          return cell.id === itemId
        }
      })

      const target = event.target as HTMLInputElement

      const dropCell = cells.value.find((cell: Iitem) => cell.id === Number(target.id))
      if (dropCell.data === null) {
        dropCell.data = item.data
        item.data = null
      }
    }

    return {
      cells,
      rows,
      deleteItem,
      moveItem
    }
  }, { persist: true }
)