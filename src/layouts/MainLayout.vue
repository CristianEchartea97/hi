<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title @click="drawer=!drawer">OTTO App</q-toolbar-title>
          <div class="q-pa-md q-gutter-sm">
            <MessageBox/>
            <LogoutBtn/>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <MainUserMenu/>
        </q-scroll-area>

        <q-img class="absolute-top"
               src="https://cdn.quasar.dev/img/material.png"
               style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img alt="Avatar" src="https://cdn.quasar.dev/img/boy-avatar.png">
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
import LogoutBtn from 'components/LogoutBtn.vue'
import MainUserMenu from 'components/MainUserMenu.vue'

export default {
  components: {
    LogoutBtn,
    MessageBox,
    MainUserMenu
  },
  data () {
    return {
      userName: '',
      drawer: false
    }
  },
  methods: {},
  mounted () {
    this.userName = this.$store.getters['xstore/getUserName']
  }
}
</script>
