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
    step: async function (newVal) {
      if (newVal !== 4) {
        return
      }
      console.log('Start file upload')
      await this.fileUpload()
    }
  },
  methods: {
    async fileUpload () {
      console.log('upload file ' + this.document.size)
      const newJobOut = await this.client.post('/api/createJob')
      const newJobData = newJobOut.data
      if (!newJobData.success) {
        this.$q.notify({
          type: 'negative',
          message: 'There was an error connecting to the server'
        })
        return
      }
      const payload = {
        jobId: newJobData.jobId,
        filename: this.file.name,
        size: this.file.size
      }
      const newDocOut = await this.client.post('/api/registerDocument', payload)
      const newDocData = newDocOut.data
      if (!newDocData.success) {
        this.$q.notify({
          type: 'negative',
          message: 'There was an error connecting to the server'
        })
      }
      console.log(newDocData)
      // const url = newDocData.data.url
      // const uploadOut = await this.client.post('/api/registerDocument', payload)
    }
  }
}
</script>
