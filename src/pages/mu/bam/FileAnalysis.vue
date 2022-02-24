<template>
  <div class="column items-center" style="height: 450px">
    <div class="col">
      <div class="text-h4">
        Your Job is being processed
      </div>
    </div>
    <div class="col">
      <q-spinner-gears
        color="primary"
        size="4em"
      />
    </div>
    <div class="col" style="min-width: 80%">
      <q-linear-progress stripe size="25px" :value="50" color="primary">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="primary" label="50%"/>
        </div>
      </q-linear-progress>
    </div>
    <div class="col">
      QUEUED
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>
