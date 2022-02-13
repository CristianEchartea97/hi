<template>
  <q-step
    :name="3"
    title="Verifying file with A.I."
    icon="assignment"
    :done="done"
  >
    <q-circular-progress
      indeterminate
      size="90px"
      :thickness="0.2"
      color="lime"
      center-color="grey-8"
      track-color="transparent"
      class="q-ma-md"
    />
  </q-step>
</template>
<script>
export default {
  props: {
    step: Number
  },
  data () {
    return {
      done: false
    }
  },
  watch: {
    step: async function (newVal, oldVal) {
      if (newVal !== 3) {
        return
      }
      console.log('start analysis ' + newVal)
      await this.runML()
    }
  },
  methods: {
    async runML () {
      await setTimeout(() => {
        console.log('analysis is done')
        this.advance()
      }, 3000)
    },
    goBack () {
      this.done = false
      this.$emit('stepBefore')
    },
    advance () {
      this.done = true
      this.$emit('stepDone')
    }
  }
}
</script>
