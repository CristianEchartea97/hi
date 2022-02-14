<template>
  <q-btn color="white" size="sm" text-color="black" label="Messages" icon="messages" @click="getNotifications">
    <q-badge color="red" floating>{{ unreadNotifications }}</q-badge>
    <q-tooltip>
      You have {{ unreadNotifications }} new messages
    </q-tooltip>
    <q-menu transition-show="jump-down">
      <q-list bordered class="rounded-borders" style="max-width: 350px">
        <q-item-label header>Friends</q-item-label>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>

        <q-separator inset="item"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Linear Project</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">John</span>
              -- Can we schedule a call for tomorrow?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
export default {
  data () {
    return {
      unreadNotifications: 0,
      notificationsList: Array
    }
  },
  methods: {
    async getNotifications () {
      const output = await this.api.get('/api/user/notifications/unseen')
      const response = output.data
      this.notificationsList = response.data
    }
  },
  mounted () {
    this.$store.dispatch('xstore/updateNotifications')
    this.unreadNotifications = this.$store.getters['xstore/getNotifications']
  }
}
</script>
