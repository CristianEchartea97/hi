<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <q-btn :disable="this.disabled"
             @click="downloadFile"
             label="Download File"
             color="secondary"
             icon-right="file_download"/>
    </div>
  </div>
</template>
<script>
export default {
  props: ['disabled', 'docId'],
  data () {
    return {}
  },
  methods: {
    downloadFile () {
      console.log('Download file ' + this.docId)
    }
  }
}
</script>
