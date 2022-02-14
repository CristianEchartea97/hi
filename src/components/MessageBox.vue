<template>
  <q-btn color="white" size="sm" text-color="black" label="Messages" icon="messages" @click="showMessages">
    <q-badge color="red" floating>{{ unreadNotifications }}</q-badge>
    <q-tooltip>
      You have {{ unreadNotifications }} new messages
    </q-tooltip>
  </q-btn>
</template>
<script>
export default {
  data () {
    return {
      unreadNotifications: 0
    }
  },
  mounted () {
    this.$store.dispatch('xstore/updateNotifications')
    this.unreadNotifications = this.$store.getters['xstore/getNotifications']
  }
}
</script>
