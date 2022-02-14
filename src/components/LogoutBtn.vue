<template>
  <q-btn :disable="logoutBtn" color="white" size="sm" text-color="black" label="LogOut"
         @click="logOut"
  />
</template>
<script>
export default {
  data () {
    return {
      logoutBtn: false
    }
  },
  methods: {
    logOut () {
      console.log('signing out')
      this.logoutBtn = true
      try {
        this.$store.dispatch('xstore/logout')
      } catch (err) {
        console.log('Ups I did it again')
      }
      try {
        this.api.defaults.headers.common.Authorization = ''
        this.$router.push({ name: 'login' })
      } catch (err) {
      }
    }
  }
}
</script>
