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

      const formAttr = newDocData.data.postAttr.formAttr
      const formInputs = newDocData.data.postAttr.formInputs

      const formData = new FormData()
      formData.append('file', this.document, this.document.name)
      formData.append('acl', formInputs.acl)
      formData.append('key', formInputs.key)
      formData.append('X-Amz-Credential', formInputs['X-Amz-Credential'])
      formData.append('X-Amz-Algorithm', formInputs['X-Amz-Algorithm'])
      formData.append('X-Amz-Date', formInputs['X-Amz-Date'])
      formData.append('Policy', formInputs.Policy)
      formData.append('X-Amz-Signature', formInputs['X-Amz-Signature'])

      try {
        const uploadOut = await this.api.post(formAttr.action, formData)
        console.log(uploadOut)
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'There was a problem uploading the file'
        })
      }
    }
  }
}
</script>
