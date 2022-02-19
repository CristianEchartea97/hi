<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
<script>
const columns = [
  {
    name: 'id',
    required: true,
    label: 'User ID',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    align: 'center',
    label: 'Name',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    required: true,
    align: 'center',
    field: row => row.email
  },
  {
    name: 'verified',
    label: 'Verified',
    required: true,
    align: 'center',
    field: row => row.email_verified_at
  },
  {
    name: 'enabled',
    label: 'Enabled',
    required: true,
    align: 'center',
    field: row => row.enabled,
    format: val => `${(val) ? 'Y' : 'N'}`
  },
  {
    name: 'last_login',
    label: 'Last login',
    align: 'center',
    field: row => row.last_login,
    sortable: true
  },
  {
    name: 'Role',
    required: true,
    align: 'center',
    label: 'Role',
    field: row => row.role
  }
]
export default {
  data () {
    return {
      columns,
      rows: []
    }
  },
  beforeMount () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const allOut = await this.api.get('/api/oa/users/all')
      const response = allOut.data
      this.rows = response.data.users
    }
  }
}
</script>
