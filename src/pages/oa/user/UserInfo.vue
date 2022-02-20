<template>
  <div class="q-pa-md">
    <h3>Info User#{{ this.id }}</h3>
    <div class="row q-gutter-md">
      <div class="col-ld-12 col-md-3">
        <q-input v-model="name" label="Name"/>
      </div>
      <div class="col-sm-12 col-md-1">
        <q-input readonly borderless v-model="role" label="Role"/>
      </div>
      <div class="col-sm-12 col-md-2">
        <q-input readonly borderless v-model="verified" label="Verified"/>
      </div>
      <div class="col-sm-12 col-md-2">
        <q-input readonly borderless v-model="created" label="Created"/>
      </div>
      <div class="col-sm-12 col-md-2">
        <q-input readonly borderless v-model="last_login" label="Last Login"/>
      </div>
      <div class="col-sm-12 col-md-1">
        <q-toggle class="q-pt-lg"
                  v-model="enabled"
                  checked-icon="check"
                  :color="(enabled)?'green':'red'"
                  unchecked-icon="clear"
                  keep-color
        />
      </div>
    </div>
    <div class="row">
      <div class="col-ld-12 col-md-3">
        <q-input type="password" v-model="password" label="New Password">
          <template v-slot:append>
            <q-icon name="lock" color="secondary"/>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12 col-md-1 q-mt-lg">
        <q-btn @click="updateInfo" size="md" color="primary" label="Save"/>
      </div>
      <div class="col-xl-12 col-md-1 q-mt-lg">
        <q-btn @click="goBack" size="md" color="secondary" label="Back"/>
      </div>
    </div>
  </div>
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
      rows,
      id: null,
      password: null,
      name: null,
      role: null,
      verified: null,
      created: null,
      last_login: null,
      enabled: false
    }
  },
  beforeMount () {
    this.getUserInfo()
  },
  methods: {
    async goBack () {
      await this.$router.back()
    },
    async updateInfo () {
      console.log('Updating')
    },
    async getUserInfo () {
      console.log(this.$route.params.id)
      this.id = this.$route.params.id
      const idOut = await this.api.get(`/api/oa/user/${this.id}`)
      const response = idOut.data
      const user = response.data.user
      this.enabled = (user.enabled === 1)
      this.name = user.name
      this.role = user.role
      this.verified = user.email_verified_at
      this.created = user.created_at
      this.last_login = user.last_login
      console.log(response)
    }
  }
}
</script>
