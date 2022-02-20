<template>
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
    <q-item :to="{ name: 'jobsHome' }" clickable v-ripple exact>
      <q-item-section avatar>
        <q-icon name="style"/>
      </q-item-section>
      <q-item-section>
        Jobs
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {}
</script>
