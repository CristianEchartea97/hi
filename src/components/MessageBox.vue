<template>
  <q-btn color="white" size="sm" text-color="black" label="Messages" icon="messages" @click="loadMessage=true">
    <q-badge color="red" floating>{{ this.$store.getters['xstore/getNotifications'] }}</q-badge>
    <q-tooltip>
      You have {{ this.$store.getters['xstore/getNotifications'] }} new messages
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
      loadMessage: false
    }
  },
  mounted () {
    this.$store.dispatch('xstore/updateNotifications')
  }
}
</script>
