<template>
  <div class="q-pa-md doc-container">
    <div class="column items-center" style="height: 550px">
      <div class="col">
        <q-uploader
          url="http://localhost:4444/upload"
          label="Select the files to upload"
          multiple
          batch
          style="max-width: 700px;min-width: 700px;"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
