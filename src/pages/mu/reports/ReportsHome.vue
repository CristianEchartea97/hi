<template>
  <div>
    <div v-if="loading" class="row justify-center">
      <div class="col-12 col-md-auto">
        <q-spinner-puff size="5rem" color="cyan" />
      </div>
    </div>
    <div v-if="dataAvailable">
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
    <div v-else>
      <div class="row justify-center">
        <div class="col-12 col-md-auto">
          <q-img style="min-width: 600px" loading="eager" :src="emptyIcon"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      dataAvailable: false,
      emptyIcon: null,
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
      this.rows = response.data.reports
      this.emptyIcon = response.data.emptyFilesIcon
      this.dataAvailable = this.rows.length > 0
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
