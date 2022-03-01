<template>
  <div>
    This is your data
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.getReport()
  },
  methods: {
    async getReport () {
      const id = this.$route.params.id
      const out = await this.api.get(`/api/mu/report/${id}`)
      const response = out.data
      console.log(response)
    }
  }
}
</script>
