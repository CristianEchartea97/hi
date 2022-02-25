<template>
  <q-dialog v-model="this.fixed" @hide="this.$emit('hide')">
    <q-card>
      <q-card-section>
        <div class="text-h6">Feedback Window</div>
      </q-card-section>
      <q-separator/>
      <q-card-section style="max-height: 60vh" class="scroll">
        <div class="q-pa-md" style="max-width: 400px">
          <div class="q-gutter-md">
            <q-select v-model="model" :options="options" label="Standard"/>
          </div>
        </div>
        <q-separator/>
        <q-input type="textarea" outlined v-model="text" label="What happens?"/>
        <q-separator/>
        <q-uploader class="q-pt-lg"
                    url="http://localhost:4444/upload"
                    style="max-width: 300px"
        />
      </q-card-section>

      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat label="Never Mind" color="secondary" v-close-popup/>
        <q-btn flat label="Send" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    openFeedback: Boolean
  },
  data () {
    return {
      text: null,
      model: null,
      fixed: false,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  methods: {},
  watch: {
    openFeedback: function (value) {
      this.fixed = value
    }
  }
}</script>
