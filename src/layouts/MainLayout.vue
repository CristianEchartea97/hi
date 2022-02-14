<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title @click="drawer=!drawer">OTTO App</q-toolbar-title>
          <div class="q-pa-md q-gutter-sm">
            <MessageBox/>
            <q-btn :disable="logoutBtn" color="white" size="sm" text-color="black" label="LogOut"
                   @click="logOut"
            />
          </div>
        </q-toolbar>
      </q-header>
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

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item :to="{ name: 'reportsHome' }" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="travel_explore"/>
              </q-item-section>
              <q-item-section>
                My Reports
              </q-item-section>
            </q-item>
            <q-item :to="{ name: 'wizardHome' }" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="tips_and_updates"/>
              </q-item-section>
              <q-item-section>
                Wizard
              </q-item-section>
            </q-item>
            <q-item :to="{ name: 'filesHome' }" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="file_upload"/>
              </q-item-section>
              <q-item-section>
                Upload
              </q-item-section>
            </q-item>
            <q-item :to="{ name: 'settingsHome' }" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="settings"/>
              </q-item-section>
              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top"
               src="https://cdn.quasar.dev/img/material.png"
               style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ userName }}</div>
            <div>@naruto</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import MessageBox from 'components/MessageBox.vue'

export default {
  components: {
    MessageBox
  },
  data () {
    return {
      logoutBtn: false,
      userName: '',
      drawer: false,
      carousel: false,
      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!'
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
    },
    showMessages () {
      this.carousel = true
    }
  },
  mounted () {
    this.userName = this.$store.getters['xstore/getUserName']
  }
}
</script>
