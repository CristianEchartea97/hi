<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated @transition="transition">
      <StepOne @stepDone="step++"/>
      <StepTwo @fileFound="getFile" @stepDone="step++" @stepBefore="step--"/>
      <StepThree/>
      <StepFour/>
    </q-stepper>
  </div>
</template>
<script>
import StepOne from 'pages/wizard/StepOne.vue'
import StepTwo from 'pages/wizard/StepTwo.vue'
import StepThree from 'pages/wizard/StepThree.vue'
import StepFour from 'pages/wizard/StepFour.vue'

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour
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
    },
    uploadFile () {
      console.log('start file upload')
    }
  }
}
</script>
