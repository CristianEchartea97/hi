<template>
  <div class="q-pa-md">
    <div class="row">
      <h4>Info User#{{ this.user.id }}</h4>
    </div>
    <div class="row q-gutter-md">
      <div class="col-ld-12 col-md-3">
        <q-input v-model="this.user.name" label="Name"/>
      </div>
      <div class="col-sm-12 col-md-1">
        <q-input readonly borderless v-model="this.user.role" label="Role"/>
      </div>
      <div class="col-sm-12 col-md-2">
        <q-input readonly borderless v-model="this.user.verified" label="Verified"/>
      </div>
      <div class="col-sm-12 col-md-2">
        <q-input readonly borderless v-model="this.user.created" label="Created"/>
      </div>
      <div class="col-sm-12 col-md-2">
        <q-input readonly borderless v-model="this.user.last_login" label="Last Login"/>
      </div>
      <div class="col-sm-12 col-md-1">
        <q-toggle class="q-pt-lg"
                  v-model="this.user.enabled"
                  checked-icon="check"
                  :color="(this.user.enabled)?'green':'red'"
                  unchecked-icon="clear"
                  keep-color
        />
      </div>
    </div>
    <div class="row">
      <div class="col-ld-12 col-md-3">
        <q-input type="password" v-model="this.user.password" label="New Password">
          <template v-slot:append>
            <q-icon name="lock" color="secondary"/>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4 col-md-1 q-mt-lg">
        <q-btn @click="updateInfo" size="md" color="primary" label="Save"/>
      </div>
      <div class="col-sm-4 col-md-1 q-mt-lg">
        <q-btn @click="goBack" size="md" color="secondary" label="Back"/>
      </div>
    </div>
    <div class="row">
      <h4>User Jobs</h4>
    </div>
    <div class="row">
      <q-table
        class="col-sm-12"
        title="Users"
        :rows="rows"
        :columns="columns"
        row-key="email"
        :filter="filter"
        :loading="loading"
        @row-click="showJob"
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
    <JobDetails :dialog-window="dialogWindow" :jobId="jobId" @windowClosed="dialogWindow=!dialogWindow"/>
  </div>
</template>
<script>
import JobDetails from 'pages/oa/user/JobDetails'

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
export default {
  components: { JobDetails },
  data () {
    return {
      jobId: null,
      dialogWindow: false,
      loading: false,
      filter: null,
      columns,
      rows: [],
      user: {
        id: null,
        password: null,
        name: null,
        role: null,
        verified: null,
        created: null,
        last_login: null,
        enabled: false
      }
    }
  },
  beforeMount () {
    this.getUserInfo()
  },
  methods: {
    async showJob (evt, row, index) {
      this.dialogWindow = true
      this.jobId = row.id
      console.log('showing ' + this.jobId)
    },
    async goBack () {
      await this.$router.back()
    },
    async updateInfo () {
      console.log('Updating')
      const payload = {
        id: this.user.id,
        name: this.user.name,
        pass: this.user.password
      }
      const out = await this.api.put('/api/oa/user/update', payload)
      if (out.status === 200) {
        this.$q.notify({
          message: 'Update was successful.',
          color: 'secondary'
        })
      } else {
        this.$q.notify({
          message: 'Update failed.',
          color: 'warning'
        })
      }
    },
    async getUserInfo () {
      this.user.id = this.$route.params.id
      this.loading = true
      const idOut = await this.api.get(`/api/oa/user/${this.$route.params.id}`)
      const response = idOut.data
      const user = response.data.user
      this.user.enabled = (user.enabled === 1)
      this.user.name = user.name
      this.user.role = user.role
      this.user.verified = user.email_verified_at
      this.user.created = user.created_at
      this.user.last_login = user.last_login
      this.rows = response.data.jobs
      this.loading = false
      console.log(response)
    }
  }
}
</script>
