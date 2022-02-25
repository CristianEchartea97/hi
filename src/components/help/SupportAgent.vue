<template>
  <q-dialog v-model="this.fixed" @hide="this.$emit('hide')">
    <q-card>
      <q-card-section>
        <div class="text-h6">Support Window</div>
      </q-card-section>
      <q-separator/>
      <q-card-section style="max-height: 70vh">
        <q-scroll-area :visible="true"
                       ref="scrollAreaRef"
                       class="q-pa-md row justify-center"
                       style="height: 350px; min-width: 400px; max-width: 400px;"
        >
          <div v-for="message in this.chatMessages" :key="message.id">
            <q-chat-message
              :avatar="message.avatar"
              :name="message.name"
              :sent="message.sent"
            >
              <div v-for="text in message.text" :key="text">
                <div>
                  {{ text }}
                </div>
              </div>
            </q-chat-message>
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-input outlined v-model="text" style="min-width: 400px"/>
        <q-btn flat label="Send" @click="sendMessage" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    openSupport: Boolean
  },
  data () {
    return {
      position: 0,
      text: null,
      fixed: false,
      chatMessages: [
        {
          id: 123,
          name: 'Support',
          avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
          text: ['hey, how are you?'],
          sent: true
        },
        {
          id: 456,
          name: 'me',
          avatar: this.$store.getters['xstore/getAvatar'],
          text: ['doing fine, how r you?'],
          sent: false
        }
      ]
    }
  },
  methods: {
    sendMessage () {
      this.chatMessages.push({
        id: 4564,
        name: 'me',
        avatar: this.$store.getters['xstore/getAvatar'],
        text: [this.text],
        sent: false
      })
      this.text = null
      this.updateScroll()
    },
    updateScroll () {
      try {
        const el = this.$refs.scrollAreaRef
        el.setScrollPercentage('vertical', 100.0, 100)
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    openSupport: function (value) {
      this.fixed = value
    }
  }
}
</script>
<style lang="css" scoped>
</style>
