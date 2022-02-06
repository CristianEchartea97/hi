<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        title="Welcome to the upload of information wizard"
        icon="settings"
        :done="step > 1"
      >
        The purpose of this wizard is to help you with the upload of the information.
        <br />
In the next step just upload the file and we will upload it and handle the information for you.
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Add a file"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-file
          clearable
          color="orange"
          standout
          bottom-slots
          v-model="model"
          label="Upload file"
          counter
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          <template v-slot:append>
            <q-icon name="favorite" />
          </template>

          <template v-slot:hint>Field hint</template>
        </q-file>

        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Data upload verified -disabled for now-"
        icon="assignment"
        disable
      >This step won't show up because it is disabled.</q-step>

      <q-step :name="4" title="Successful upload" icon="add_comment">
        The file was uploaded successfully.
        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      step: ref(1)
    }
  }
}
</script>
