<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab
      icon="question_mark"
      direction="up"
      color="primary"
    >
      <q-fab-action @click="onClick" color="primary" icon="support_agent"/>
      <q-fab-action @click="onClick" color="primary" icon="report_problem"/>
    </q-fab>
  </q-page-sticky>
</template>
<script>
export default {
  methods: {
    onClick () {
      console.log('Clicked on a fab action')
      this.fabRight = !this.fabRight
    }
  }
}
</script>
