<template>
  <q-step
    :name="2"
    title="Add a file"
    icon="create_new_folder"
    :done="done"
  >
    <q-file
      clearable
      color="orange"
      standout
      bottom-slots
      v-model="file"
      label="Upload file"
      @update:model-value="readFileProperties"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
      <template v-slot:append>
        <q-icon name="favorite"/>
      </template>
    </q-file>

    <q-stepper-navigation>
      <q-btn @click="advance" color="primary" label="Continue"/>
      <q-btn flat @click="goBack" color="primary" label="Back" class="q-ml-sm"/>
    </q-stepper-navigation>
  </q-step>
</template>
<script>
export default {
  props: [
    'document'
  ],
  data () {
    return {
      done: false,
      file: null
    }
  },
  methods: {
    goBack () {
      this.done = false
      this.$emit('stepBefore')
    },
    advance () {
      console.log('user is picking the file')
      this.done = true
      this.$emit('stepDone')
    },
    readFileProperties () {
      if (this.file.size < 100000) {
        this.step = 2
        this.$q.notify({
          type: 'negative',
          message: 'Your file is too small :c.'
        })
      }
      console.log('File was selected ' + this.file.name)
      console.log('File was selected ' + this.file.size + ' bytes')
      this.$emit('fileFound', this.file)
    }
  }
}
</script>
