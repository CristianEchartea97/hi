<template>
  <q-btn color="white" size="sm" text-color="black" label="Messages" icon="messages" @click="loadMessage=true">
    <q-badge color="red" floating>{{ unreadNotifications }}</q-badge>
    <q-tooltip>
      You have {{ unreadNotifications }} new messages
    </q-tooltip>
    <NotificationsList :load-message="loadMessage"/>
  </q-btn>
</template>
<script>
import NotificationsList from 'components/NotificationsList.vue'

export default {
  components: { NotificationsList },
  data () {
    return {
      loadMessage: false,
      unreadNotifications: 0
    }
  },
  mounted () {
    this.$store.dispatch('xstore/updateNotifications')
    this.unreadNotifications = this.$store.getters['xstore/getNotifications']
  }
}
</script>
