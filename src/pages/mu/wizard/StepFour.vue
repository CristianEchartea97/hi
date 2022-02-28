<template>
  <q-step
    :name="4"
    title="Upload status"
    icon="add_comment"
    :done="done"
  >
    <div class="q-pa-md">
      <q-linear-progress stripe rounded size="20px" :value="progress" :animation-speed="200" color="cyan"
                         class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="cyan" text-color="white" :label="progressLabel"/>
        </div>
      </q-linear-progress>
    </div>
    <div v-if="done">
      The file was uploaded successfully.
      <q-icon name="done"/>
    </div>

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
      progress: 0,
      progressLabel: '0 %'
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
      const key = newDocData.data.key

      const formData = new FormData()
      formData.append('Policy', formInputs.Policy)
      formData.append('X-Amz-Algorithm', formInputs['X-Amz-Algorithm'])
      formData.append('X-Amz-Credential', formInputs['X-Amz-Credential'])
      formData.append('X-Amz-Date', formInputs['X-Amz-Date'])
      formData.append('X-Amz-Signature', formInputs['X-Amz-Signature'])
      formData.append('acl', formInputs.acl)
      formData.append('key', key)
      formData.append('file', this.document, this.document.name)

      try {
        const config = {
          onUploadProgress: progressEvent => this.updateProgress(progressEvent)
        }
        const uploadOut = await this.axios.post(formAttr.action, formData, config)
        if (uploadOut.status === 204) {
          this.done = true
          const update = {
            docId: newDocData.data.docId
          }
          await this.api.put('/api/markDocumentAsUploaded', update)
          await this.$router.push({
            name: 'jobAnalysis',
            params: { id: payload.jobId }
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'There was a problem uploading the file'
          })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'There was a problem uploading the file'
        })
      }
    },
    updateProgress (progressEvent) {
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      this.progressLabel = percentage + ' %'
      this.progress = percentage / 100
    }
  }
}
</script>
