<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>OTTO App</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item :to="{ name: 'reportsHome' }" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="travel_explore"/>
              </q-item-section>
              <q-item-section>
                My Reports
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

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Naruto Uzumake</div>
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
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>
