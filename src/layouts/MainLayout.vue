<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title @click="drawer=!drawer">
            OTTO App
            <q-icon name="verified_user" v-if="this.$store.getters['xstore/getRole']==='OTTITOAdmin'"/>
          </q-toolbar-title>
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
          <MainUserMenu v-if="this.$store.getters['xstore/getRole']==='MainUser'"/>
          <OttoAdminMenu v-if="this.$store.getters['xstore/getRole']==='OTTITOAdmin'"/>
        </q-scroll-area>

        <q-img class="absolute-top"
               :src="this.$store.getters['xstore/getBackground']"
               style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img alt="Avatar" :src="this.$store.getters['xstore/getAvatar']">
            </q-avatar>
            <div class="text-weight-bold">{{ this.$store.getters['xstore/getUserName'] }}</div>
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
import MessageBox from 'components/MessageBox'
import LogoutBtn from 'components/LogoutBtn'
import MainUserMenu from 'components/MainUserMenu'
import OttoAdminMenu from 'components/OttoAdminMenu'

export default {
  components: {
    OttoAdminMenu,
    LogoutBtn,
    MessageBox,
    MainUserMenu
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {},
  mounted () {
  }
}
</script>
