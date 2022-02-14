<template>
  <q-menu transition-show="jump-down">
    <q-list bordered class="rounded-borders" style="max-width: 650px; min-width: 650px">
      <q-item-label header>Notifications</q-item-label>
      <q-item v-show="working">
        <q-spinner-dots
          color="primary"
          size="2em"
        />
      </q-item>
      <div v-for="notification in notificationsList" :key="notification.id">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <q-img alt="avatar" :src=notification.avatar></q-img>
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
</template>
<script>
export default {
  props: {
    loadMessage: Boolean
  },
  data () {
    return {
      notificationsList: [],
      working: false
    }
  },
  methods: {
    async getNotifications () {
      if (this.notificationsList.length > 0) {
        return
      }
      this.working = true
      const output = await this.api.get('/api/user/notifications/unseen')
      const response = output.data
      this.working = false
      this.notificationsList = response.data
    }
  },
  watch: {
    loadMessage: function () {
      this.getNotifications()
    }
  }
}
</script>
