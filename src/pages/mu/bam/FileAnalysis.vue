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
  data () {
    return {
      state: null,
      timer: null,
      progress: 0.0,
      progressStr: '0%'
    }
  },
  methods: {
    async updateProgress () {
      const id = this.$route.params.id
      const progOut = await this.api.get(`/api/mu/job/${id}/status`)
      const response = progOut.data
      this.state = response.data.status
      this.progress = response.data.progress / 100
      this.progressStr = response.data.progress + '%'
    }
  },
  mounted: function () {
    this.updateProgress()
    this.timer = setInterval(() => {
      if (this.progress >= 1) {
        this.progress = 1
        clearInterval(this.timer)
      }
      this.updateProgress()
    }, 10000)
  },
  watch: {
    state: async function (newVal, old) {
      console.log('old ' + old + ' newVal ' + newVal)
      if (newVal === 'FINISHED') {
        console.log('The jobs analysis has finished')
        // get report id
        await this.$router.push({
          name: 'viewReport',
          params: { id: 'xxx' }
        })
      }
      if (newVal === 'FAILED') {
        // redirect to errors page
        console.log('The jobs analysis has finished')
        await this.$router.push({
          name: 'errorOnReport',
          params: { id: 'xxx' }
        })
      }
    }
  }
}
</script>
