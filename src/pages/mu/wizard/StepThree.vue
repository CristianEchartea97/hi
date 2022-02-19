<template>
  <q-step
    :name="3"
    title="Verifying file with A.I."
    icon="assignment"
    :done="done"
  >
    <q-spinner-grid size="90px" color="teal"/>
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
      }, 5000)
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
