<template>
  <q-btn color="white" size="sm" text-color="black" label="Messages" icon="messages" @click="showMessages">
    <q-badge color="red" floating>{{ unreadNotifications }}</q-badge>
    <q-tooltip>
      You have {{ unreadNotifications }} new messages
    </q-tooltip>
  </q-btn>
  <q-dialog v-model="carousel">
    <q-carousel
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      v-model="slide"
      control-color="primary"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      height="200px"
      class="bg-white shadow-1 rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap flex-center">
        <q-icon name="style" color="primary" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap flex-center">
        <q-icon name="live_tv" color="primary" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap flex-center">
        <q-icon name="layers" color="primary" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap flex-center">
        <q-icon name="terrain" color="primary" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>
<script>
export default {
  data () {
    return {
      carousel: false,
      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
      unreadNotifications: 0
    }
  },
  methods: {
    showMessages () {
      this.carousel = true
    }
  },
  mounted () {
    this.$store.dispatch('xstore/updateNotifications')
    this.unreadNotifications = this.$store.getters['xstore/getNotifications']
  }
}
</script>
