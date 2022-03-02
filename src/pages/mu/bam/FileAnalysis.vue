<template>
  <div class="column items-center" style="height: 450px">
    <div class="col">
      <div class="text-h4">
        Your Job is being processed
      </div>
    </div>
    <div class="col">
      <q-spinner-gears
        color="primary"
        size="4em"
      />
    </div>
    <div class="col" style="min-width: 80%">
      <q-linear-progress stripe size="25px" :value="this.progress" color="primary" :animation-speed="300">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="primary" :label="this.progressStr"/>
        </div>
      </q-linear-progress>
    </div>
    <div class="col">
      {{ state }}
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    redirect (page) {
      if (page === 'FINISHED') {
        this.$router.push({
          name: 'viewReport',
          params: { id: this.docId }
        })
      } else {
        this.$router.push({
          name: 'errorOnReport',
          params: { id: this.docId }
        })
      }
    }
  },
  watch: {
    state: async function (newVal, old) {
      console.log('old ' + old + ' newVal ' + newVal)
      if (newVal === 'FAILED' || newVal === 'FINISHED') {
        this.redirect(newVal)
      }
    }
  },
  data () {
    return {
      docId: null,
      state: null,
      timer: null,
      progress: 0.0,
      progressStr: '0%'
    }
  },
  mounted () {
    const update = async () => {
      if (this.progress >= 1) {
        this.progress = 1
      }
      const id = this.$route.params.id
      const progOut = await this.api.get(`/api/mu/job/${id}/status`)
      const response = progOut.data
      this.state = response.data.status
      this.docId = response.data.docId
      let tempProgress = response.data.progress
      if (tempProgress > 100) {
        tempProgress = 100
      }
      this.progress = tempProgress / 100
      this.progressStr = tempProgress + '%'
    }
    update()
    this.timer = setInterval(update, 3000)
  },
  beforeUnmount () {
    clearInterval(this.timer)
  }
}
</script>
