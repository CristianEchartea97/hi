<template>
  <q-step :name="4" title="Successful upload" icon="add_comment" :done="done">
    The file was uploaded successfully.
    <q-stepper-navigation>
      <q-btn color="primary" label="Finish"/>
      <q-btn flat @click="uploadFile" color="primary" label="Back" class="q-ml-sm"/>
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
    fileUpload () {
      console.log('upload file')
    }
  }
}
</script>
