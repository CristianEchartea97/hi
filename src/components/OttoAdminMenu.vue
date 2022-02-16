<template>
  <q-list padding>
    <q-item :to="{ name: 'reportsHome' }" clickable v-ripple exact>
      <q-item-section avatar>
        <q-icon name="people"/>
      </q-item-section>
      <q-item-section>
        Users
      </q-item-section>
    </q-item>
    <q-item :to="{ name: 'wizardHome' }" clickable v-ripple exact>
      <q-item-section avatar>
        <q-icon name="campaign"/>
      </q-item-section>
      <q-item-section>
        Notifications
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
export default {}
</script>
