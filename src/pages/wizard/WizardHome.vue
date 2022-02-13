<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated @transition="transition">
      <StepOne @stepDone="step++"/>
      <StepTwo @fileFound="getFile" @stepDone="step++" @stepBefore="step--"/>
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
import StepOne from 'pages/wizard/StepOne.vue'
import StepTwo from 'pages/wizard/StepTwo.vue'

export default {
  components: {
    StepOne,
    StepTwo
  },
  data () {
    return {
      step: 1,
      document: null,
      alert: false,
      client: this.api
    }
  },
  methods: {
    getFile (document) {
      this.document = document
    },
    transition (newVal, oldVal) {
      console.log('new ' + newVal + ' old ' + oldVal)
      switch (newVal) {
        case 1:
          break
        case 2:
          console.log('user is picking the file')
          break
        case 3:
          console.log('Running validation ' + this.document.name)
          setTimeout(() => {
            this.step++
          }, 3000)
          break
        case 4:
          console.log('uploading file')
          break
      }
    },
    uploadFile () {
      console.log('start file upload')
    }
  }
}
</script>
