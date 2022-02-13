<template>
  <q-step
    :name="4"
    title="Successful upload"
    icon="add_comment"
    :done="done"
  >
    The file was uploaded successfully.
  </q-step>
</template>
<script>
export default {
  props: {
    document: Object,
    step: Number
  },
  data () {
    return {
      done: false,
      client: this.api
    }
  },
  watch: {
    step: function (newVal) {
      if (newVal !== 4) {
        return
      }
      console.log('Start file upload')
      this.fileUpload()
    }
  },
  methods: {
    fileUpload () {
      console.log('upload file ' + this.document.size)
    }
  }
}
</script>
