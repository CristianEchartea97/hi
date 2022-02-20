<template>
  <q-dialog v-model="openWindow" @hide="onDialogHide">
    <q-card style="min-width: 600px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Job #{{ this.job.id }}
          <q-icon name="fitness_center"/>
        </div>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>
      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-show="requestDone" class="q-pa-md">
            <div class="row q-gutter-md" style="min-width: 560px">
              <div class="col-sm-12 col-md-3">
                <q-input readonly borderless v-model="this.job.created_at" label="Created"/>
              </div>
              <div class="col-sm-12 col-md-3">
                <q-input readonly borderless v-model="this.job.clicks" label="Clicks"/>
              </div>
              <div class="col-sm-12 col-md-3">
                <q-input readonly borderless v-model="this.job.state" label="State"/>
              </div>
              <div class="col-sm-12 col-md-3">
                <q-input readonly borderless v-model="this.job.size" label="Size(MB)"/>
              </div>
            </div>
            <div class="row q-gutter-md" style="min-width: 460px">
              <div class="col-sm-12 col-md-3">
                <q-input readonly borderless v-model="this.job.name" label="Name"/>
              </div>
              <div class="col-sm-12 col-md-2">
                <q-input readonly borderless v-model="this.job.type" label="Type"/>
              </div>
              <div class="col-sm-12 col-md-2">
                <q-input readonly borderless v-model="this.job.uploaded" label="Uploaded"/>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <q-input readonly borderless v-model="this.job.location" label="Location"/>
            </div>
            <DownloadBtn :disabled="this.job.uploaded===0" :doc-id="this.job.docId"/>
          </div>
        </transition>
      </q-card-section>
      <q-inner-loading :showing="spinner">
        <q-spinner-audio size="60px" color="secondary"/>
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import DownloadBtn from 'pages/oa/user/DownloadBtn'

export default {
  components: { DownloadBtn },
  props: ['dialogWindow', 'jobId'],
  data () {
    return {
      requestDone: false,
      spinner: false,
      openWindow: false,
      job: {
        id: null,
        clicks: null,
        created_at: null,
        updated_at: null,
        state: null,
        docId: null,
        uploaded: null,
        name: null,
        location: null,
        size: null,
        type: null
      }
    }
  },
  watch: {
    dialogWindow: function () {
      if (!this.dialogWindow) {
        return
      }
      this.spinner = true
      this.openWindow = true
      this.getJobInfo()
    }
  },
  methods: {
    onDialogHide () {
      this.openWindow = false
      this.requestDone = false
      this.spinner = true
      this.$emit('windowClosed')
    },
    async getJobInfo () {
      const jobOut = await this.api.get(`/api/oa/job/${this.jobId}`)
      const response = jobOut.data
      this.job = response.data.job
      this.requestDone = true
      this.spinner = false
    }
  }
}
</script>
