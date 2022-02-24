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
      In_PROGRESS
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: null,
      progress: 0.0,
      progressStr: '0%'
    }
  },
  methods: {},
  mounted: function () {
    this.timer = setInterval(() => {
      if (this.progress >= 1) {
        this.progress = 1
        clearInterval(this.timer)
      }
      this.progress += 0.003
      this.progressStr = (Math.round(this.progress * 100)) + '%'
    }, 1000)
  }
}
</script>
