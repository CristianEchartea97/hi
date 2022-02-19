<template>
  <h1>user Info</h1>
</template>
<script>
const columns = [
  {
    name: 'id',
    required: true,
    label: 'Job ID',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'state',
    label: 'State',
    required: true,
    align: 'center',
    field: row => row.jobState,
    sortable: true
  },
  {
    name: 'name',
    label: 'Doc Name',
    required: true,
    align: 'center',
    field: row => row.document
  },
  {
    name: 'created',
    label: 'Created',
    required: true,
    align: 'center',
    field: row => row.created_at
  },
  {
    name: 'uploaded',
    label: 'Uploaded?',
    required: true,
    align: 'center',
    field: row => row.uploaded,
    format: val => `${(val) ? 'Y' : 'N'}`
  },
  {
    name: 'size',
    required: true,
    label: 'Size(MB)',
    align: 'left',
    field: row => row.size,
    sortable: true
  },
  {
    name: 'clicks',
    required: true,
    label: 'Clicks',
    align: 'left',
    field: row => row.clicks,
    sortable: true
  }
]
const rows = [
  {
    id: 42,
    created_at: '2022-02-19 22:25:29',
    jobState: 'QUEUED',
    document: 'dummy-document.data',
    uploaded: 1,
    size: 52428800,
    clicks: 0
  },
  {
    id: 41,
    created_at: '2022-02-19 19:18:30',
    jobState: 'PREPARING',
    document: 'dummy-document.data',
    uploaded: 1,
    size: 52428800,
    clicks: 0
  }]
export default {
  data () {
    return {
      columns,
      rows
    }
  },
  beforeMount () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      console.log(this.$route.params.id)
      const id = this.$route.params.id
      const idOut = await this.api.get(`/api/oa/user/${id}`)
      const response = idOut.data
      console.log(response)
    }
  }
}
</script>
