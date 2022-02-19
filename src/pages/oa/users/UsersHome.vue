<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="email"
      :filter="filter"
      :loading="loading"
      @row-click="goToUser"
    >
      <template v-slot:top-right>
        <q-input class="q-pa-md" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <ExportBtn :columns="columns" :rows="rows"/>
      </template>
    </q-table>
  </div>
</template>
<script>
import ExportBtn from 'pages/oa/users/ExportBtn'

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
  components: {
    ExportBtn
  },
  data () {
    return {
      columns,
      rows: [],
      filter: '',
      loading: true
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
      this.loading = false
    },
    goToUser (evt, row, index) {
      this.$router.push({
        name: 'userInfo',
        params: { id: index }
      })
    }
  }
}
</script>
