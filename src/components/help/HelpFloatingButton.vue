<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab
      icon="question_mark"
      direction="up"
      color="primary"
    >
      <q-fab-action @click="openSupportWindow" color="primary" icon="support_agent">
        <q-tooltip anchor="center left"
                   self="center right"
                   transition-show="rotate"
                   transition-hide="rotate"
                   class="bg-blue"
        >
          Contact Support
        </q-tooltip>
      </q-fab-action>
      <q-fab-action @click="openFeedbackWindow" color="primary" icon="report_problem">
        <q-tooltip anchor="center left"
                   self="center right"
                   transition-show="rotate"
                   transition-hide="rotate"
                   class="bg-red"
        >
          Send Feedback
        </q-tooltip>
      </q-fab-action>
    </q-fab>
    <SupportAgent :open-support="openSupport" @hide="openSupport=false"/>
    <FeedbackWindow :open-feedback="feedbackWindow" @hide="feedbackWindow=false"/>
  </q-page-sticky>
</template>
<script>
import SupportAgent from 'components/help/SupportAgent'
import FeedbackWindow from 'components/help/FeedbackWindow'

export default {
  components: {
    FeedbackWindow,
    SupportAgent
  },
  data () {
    return {
      openSupport: false,
      feedbackWindow: false
    }
  },
  methods: {
    openSupportWindow () {
      console.log('Support Window')
      this.openSupport = true
    },
    openFeedbackWindow () {
      console.log('Feedback Window')
      this.feedbackWindow = true
    }
  }
}
</script>
