<template>
  <div class="q-pa-md doc-container">
    <div class="column items-center" style="height: 550px">
      <div class="col">
        <q-uploader
          url="http://localhost:4444/upload"
          label="Please upload the file"
          color="amber"
          text-color="black"
          no-thumbnails
          style="max-width: 300px"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
