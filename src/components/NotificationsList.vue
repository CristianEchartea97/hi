<template>
  <q-menu transition-show="jump-down">
    <q-list bordered class="rounded-borders" style="max-width: 750px; min-width: 650px">
      <q-item-label header>Notifications</q-item-label>
      <q-item v-show="working">
        <q-spinner-dots
          color="primary"
          size="2em"
        />
      </q-item>
      <div v-for="notification in notificationsList" :key="notification.id">
        <q-item clickable v-ripple @click="showMessage(notification)">
          <q-item-section avatar>
            <q-avatar>
              <q-img alt="avatar" :src="notification.avatar"/>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">System Update</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">{{ notification.name }}</span>
              {{ notification.message }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            {{ notification.created_at }}
          </q-item-section>
        </q-item>
        <q-separator inset="item"/>
      </div>
    </q-list>
  </q-menu>
  <q-dialog v-model="messageDetails">
    <q-card>
      <q-card-section>
        <q-avatar>
          <q-img alt="avatar" :src=message.avatar></q-img>
        </q-avatar>
        <span class="q-pl-lg text-weight-bold">{{ message.name }}</span>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ message.message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="notificationWasSeen(message)" flat label="OK" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    loadMessage: Boolean
  },
  data () {
    return {
      notificationsList: [],
      working: false,
      message: Object,
      messageDetails: false
    }
  },
  methods: {
    async refreshNotifications () {
      this.working = true
      const output = await this.api.get('/api/user/notifications/unseen')
      const response = output.data
      this.notificationsList = response.data
      await this.$store.dispatch('xstore/updateNotifications')
      this.working = false
    },
    async getNotifications () {
      if (this.notificationsList.length > 0) {
        return
      }
      await this.refreshNotifications()
    },
    showMessage (message) {
      this.message = message
      this.messageDetails = true
    },
    async notificationWasSeen (message) {
      this.messageDetails = false
      console.log('marking ' + message.id + ' as seen')
      const payload = {
        id: message.id
      }
      await this.api.put('/api/user/notifications/seen', payload)
      await this.refreshNotifications()
    }
  },
  watch: {
    loadMessage: function () {
      this.getNotifications()
    }
  }
}
</script>
