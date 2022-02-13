<template>
  <q-step
    :name="3"
    title="Verifying file with A.I."
    icon="assignment"
    :done="done"
    @focus="runML"
  >
    Validating the file
  </q-step>
</template>
<script>
export default {
  data () {
    return {
      done: false
    }
  },
  methods: {
    runML () {
      setTimeout(() => {
        console.log('analysis is done')
      }, 3000)
    }
  }
}
</script>
