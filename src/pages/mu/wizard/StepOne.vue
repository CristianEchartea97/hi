<template>
  <q-step
    :name="1"
    title="Welcome to the upload of information wizard"
    icon="settings"
    :done="done"
  >
    The purpose of this wizard is to help you with the upload of the information.
    <br/>
    In the next step just upload the file and we will upload it and handle the information for you.
    <q-stepper-navigation>
      <q-btn @click="advance" color="primary" label="Continue"/>
    </q-stepper-navigation>
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
    advance () {
      this.done = true
      this.$emit('stepDone')
    }
  }
}
</script>
