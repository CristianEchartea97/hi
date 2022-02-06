<template>
<q-table
  :rows="rows"
  :columns="columns"
  row-key="id"
>
  <template #top>
    <div class="text-bold" >
      My statements
    </div>
  </template>
  <template #body-cell="props">
    <q-td
      :props="props"
    >
      <q-btn
        flat
        color="primary"
        :label="props.value"
        @click="copyToClipboard(props.value)"
      />
    </q-td>
  </template>
</q-table>
</template>
<script>
import { copyToClipboard } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const rows = ref([
      {
        id: 1,
        name: 'Britney',
        email: 'britney@freebritney.com',
        details: 'button'
      },
      {
        id: 2,
        name: 'Selena Gomez',
        email: 'selena@selenag.com',
        details: 'button'
      },
      {
        id: 3,
        name: 'Rebeca G',
        email: 'beckyg@rebecagar.com',
        details: 'button'
      }
    ])

    const columns = ref([
      { label: 'Artist name', field: 'name', name: 'name', align: 'center' },
      { label: 'Email', field: 'email', name: 'email', align: 'center' },
      { label: 'Details', field: 'details', name: 'details', align: 'right' }
    ])

    return {
      copyToClipboard,
      rows,
      columns
    }
  }
}
</script>
