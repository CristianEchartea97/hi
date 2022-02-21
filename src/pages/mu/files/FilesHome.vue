<template>
  <q-file
    clearable
    @clear="clear"
    color="orange"
    standout
    bottom-slots
    v-model="file"
    label="Upload file"
    @update:model-value="readFileProperties"
    counter
  >
    <template v-slot:prepend>
      <q-icon name="attach_file"/>
    </template>
    <template v-slot:append>
      <q-icon name="favorite"/>
    </template>
  </q-file>
  <div v-if="enabled">
    <q-btn
      color="secondary"
      @click="fileUpload"
      icon="cloud_upload"
    />
    </div>
   <div v-if="started">
    <q-linear-progress
      stripe
      rounded
      size="20px"
      :value="progress"
      :animation-speed="200"
      color="cyan"
      class="q-mt-sm"
    >
      <div class="absolute-full flex flex-center">
        <q-badge color="cyan" text-color="white" :label="progressLabel"/>
      </div>
    </q-linear-progress>
  </div>
  <div v-if="done">
    The file was uploaded successfully.
    <q-icon name="done"/>
  </div>

</template>
<script>
export default {

  data () {
    return {
      file: null,
      enabled: false,
      started: false,
      done: false,
      progress: 0,
      progressLabel: '0 %'
    }
  },
  watch: {
    step: async function () {
      console.log('Start file upload')
      await this.fileUpload()
    }
  },
  methods: {
    clear () {
      this.done = false // assume another upload
      this.enabled = false
      this.file = null
      this.started = false
    },
    readFileProperties () {
      if (this.file === null) {
        return
      }
      if (this.file.size < 100000) {
        this.$q.notify({
          type: 'negative',
          message: 'Your file is too small :c.'
        })
        return
      }
      this.enabled = true
      console.log('File was selected ' + this.file.name)
      console.log('File was selected ' + this.file.size + ' bytes')
    },
    async fileUpload () {
      console.log(this.file)
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
        filename: this.file.name,
        size: this.file.size
      }
      console.log('doc ' + this.file.name)
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
      formData.append('file', this.file, this.file.name)

      try {
        const config = {
          onUploadProgress: (progressEvent) =>
            this.updateProgress(progressEvent)
        }
        const uploadOut = await this.axios.post(
          formAttr.action,
          formData,
          config
        )
        if (uploadOut.status === 204) {
          this.done = true
          const update = {
            docId: newDocData.data.docId
          }
          await this.api.put('/api/markDocumentAsUploaded', update)
          this.enabled = false
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'There was a problem uploading the file'
          })
        }
        console.log(uploadOut)
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'There was a problem uploading the file'
        })
      }
    },
    updateProgress (progressEvent) {
      this.started = true
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      console.log('percentage' + percentage)
      this.progressLabel = percentage + ' %'
      const progressBar = percentage / 100
      console.log('progressBar' + progressBar)
      this.progress = progressBar
    }
  }
}
</script>
