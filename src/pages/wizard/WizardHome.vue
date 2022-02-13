<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        title="Welcome to the upload of information wizard"
        icon="settings"
        :done="step > 1"
      >
        The purpose of this wizard is to help you with the upload of the information.
        <br/>
        In the next step just upload the file and we will upload it and handle the information for you.
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Add a file"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-file
          clearable
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

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Continue"/>
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Verifying file with A.I."
        icon="assignment"
      >
        Validating the file
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue"/>
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" title="Successful upload" icon="add_comment">
        The file was uploaded successfully.
        <q-stepper-navigation>
          <q-btn color="primary" label="Finish"/>
          <q-btn flat @click="uploadFile" color="primary" label="Back" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>
<script>
export default {
  data () {
    return {
      step: 1,
      file: null,
      alert: false,
      client: this.api
    }
  },
  methods: {
    readFileProperties () {
      if (this.file.size < 100000) {
        this.step = 2
        this.$q.notify({
          type: 'negative',
          message: 'Your file is too small :c.'
        })
      }
      console.log('File was selected ' + this.file.name)
      console.log('File was selected ' + this.file.size)
    },
    uploadFile () {
      console.log('start file upload')
    }
  }
}
</script>
