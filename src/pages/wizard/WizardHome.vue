<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>
      <StepOne @stepDone="step++"/>
      <StepTwo @fileFound="getFile" @stepDone="step++" @stepBefore="step--"/>
      <StepThree :step="step" @stepDone="step++" @stepBefore="step--"/>
      <StepFour :step="step" :document="document"/>
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
      startAnalysis: false
    }
  },
  methods: {
    getFile (document) {
      this.document = document
      console.log('document is ' + this.document.name)
    }
  }
}
</script>
