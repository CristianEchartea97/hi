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
      done: false
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
      const newJobOut = await this.api.post('/api/createJob')
      const newJobData = newJobOut.data
      if (!newJobData.success) {
        this.$q.notify({
          type: 'negative',
          message: 'There was an error connecting to the server'
        })
        return
      }
      const payload = {
        jobId: newJobData.data.jobId,
        filename: this.document.name,
        size: this.document.size
      }
      const newDocOut = await this.api.post('/api/registerDocument', payload)
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
