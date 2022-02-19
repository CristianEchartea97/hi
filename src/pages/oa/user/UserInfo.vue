<template>
  <h1>user Info</h1>
</template>
<script>
export default {
  data () {
    return {}
  },
  beforeMount () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      console.log(this.$route.params.id)
    }
  }
}
</script>
