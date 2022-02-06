<template>
  <div class="row items-center">
    <div class="col-12">
      <q-uploader
        url="http://localhost:4444/upload"
        label="Batch upload"
        multiple
        batch
        style="max-width: 300px"
      />
    </div>
  </div>
</template>
<script>
export default {}
</script>
