<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="myPage row items-stretch">
        <!-- form column-->
        <q-page-container class="cona q-pa-xl col-12 col-lg-4 row items-center">
          <q-form @submit.prevent="submit" class="bg-white q-pa-md col-all">
            <q-badge>{{ this.appVersion }}</q-badge>
            <q-input
              v-model="form.email"
              type="email"
              lazy-rules
              label="Email"
              :rules="[ val => val && val.length > 0 || 'Email cannot be empty']"
            />
            <q-input
              v-model="form.password"
              type="password"
              lazy-rules
              label="Password"
              :rules="[ val => val && val.length > 0 || 'Password cannot be empty']"
            />
            <q-btn :disable="btnAction" class="q-mt-lg" label="Login" type="submit" lazy-rules
                   color="primary">
            </q-btn>
            <q-btn :disable="btnAction" class="q-mt-lg" label="Register" type="submit" lazy-rules
                   color="accent"
                   flat @click="doRegister"
            />
            <q-spinner-bars v-if="working" size="md" color="secondary" class="self-end"/>
            <div v-if="error">
              <q-dialog v-model="error">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Alert</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    Could not authenticate, please check email or password.
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-form>
        </q-page-container>
        <!-- video column-->
        <q-page-container
          class="conb col-md-8 video shadow-10 desktop-only overflow-hidden">
          <q-parallax :height="windowHeight">
            <template v-slot:media>
              <video width="1920" height="1080"
                     poster="https://cdn.quasar.dev/img/polina.jpg" autoplay
                     loop muted>
                <source type="video/webm"
                        src="https://cdn.quasar.dev/img/polina.webm">
                <source type="video/mp4"
                        src="https://cdn.quasar.dev/img/polina.mp4">
              </video>
            </template>
          </q-parallax>
        </q-page-container>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      appVersion: this.applicationVersion,
      form: {
        email: '',
        password: ''
      },
      error: false,
      working: false,
      btnAction: false,
      alert: ''
    }
  },
  methods: {
    submit () {
      this.btnAction = true
      if (!this.form.email || !this.form.password) {
        console.log('something wrong')
      } else if (this.form.password.length < 6) {
        console.log('password length')
      } else {
        try {
          this.working = true
          this.$store.dispatch('xstore/login', this.form).then(() => {
            setTimeout(() => {
              if (this.$store.getters['xstore/isAuthenticated']) {
                this.$store.dispatch('xstore/updateAppVersion', this.appVersion)
                this.working = false
                const token = this.$store.getters['xstore/getToken']
                this.api.defaults.headers.common.Authorization = 'Bearer ' + token
                const homePage = this.$store.getters['xstore/getHomePage']
                this.$router.push({ name: homePage })
              }
            }, 100)
          })
        } catch (err) {
          this.error = true
          this.alert = 'error'
          this.form.email = ''
          this.form.password = ''
          this.btnAction = false
        }
      }
    },
    doRegister () {
      this.$router.push({ name: 'signup' })
    }
  },
  computed: {
    windowHeight () {
      return window.innerHeight
    }
  }
}
</script>

<style lang="sass" scoped>
.cona
  background: $secondary

.conb
  background: #F2C037
</style>
