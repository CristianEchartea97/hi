<template>
  <q-btn
    color="primary"
    icon-right="archive"
    label="Export to csv"
    no-caps
    @click="exportTable"
  />
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    exportTable () {
      console.log('exporting')
    }
  }
}
</script>
