<template>
  <div>
    <q-table
      title="Reports"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      @row-click="goToReport"
    >
      <template v-slot:top-right>
        <q-input class="q-pa-md" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>
<script>

export default {
  data () {
    return {
      loading: true,
      filter: null,
      rows: [],
      columns: [
        {
          name: 'jobId',
          required: true,
          label: 'job',
          align: 'center',
          field: row => row.jobId
        },
        {
          name: 'state',
          required: true,
          label: 'state',
          align: 'center',
          field: row => row.state
        },
        {
          name: 'docName',
          required: true,
          label: 'Name',
          align: 'center',
          field: row => row.docName
        }
      ]
    }
  },
  methods: {
    async loadReports () {
      this.loading = true
      const repOut = await this.api.get('/api/mu/all/reports')
      const response = repOut.data
      this.rows = response.data
      this.loading = false
    },
    goToReport (evt, row, index) {
      console.log('index ' + row.docId)
      this.$router.push({
        name: 'viewReport',
        params: { id: row.docId }
      })
    }
  },
  mounted () {
    this.loadReports()
  }
}
</script>
