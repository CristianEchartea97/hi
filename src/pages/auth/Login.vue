<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="myPage row items-stretch">
        <!-- form column-->
        <q-page-container class="cona q-pa-xl col-12 col-lg-4 row items-center">
          <q-form @submit.prevent="submit" class="bg-white q-pa-md col-all">
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
            <q-btn class="q-mt-lg" label="Login" type="submit" lazy-rules
                   color="primary"
            />
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
          <q-btn class="q-mt-lg" label="Register" type="submit" lazy-rules
                 color="accent"
                 flat @click="doRegister"
          />
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
import { mapActions } from 'vuex'
import { useRouter } from 'vue-router'

let $route
// eslint-disable-next-line no-unused-vars
export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: false,
      alert: ''
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submit () {
      if (!this.form.email || !this.form.password) {
        console.log('something wrong')
      } else if (this.form.password.length < 6) {
        console.log('password length')
      } else {
        try {
          await this.doLogin(this.form)
          $route.push('/home')
        } catch (err) {
          this.error = true
          this.alert = 'error'
          this.form.email = ''
          this.form.password = ''
        }
      }
    },
    doRegister () {
      console.log('in do register')
      $route.push('/signup')
    }
  },
  computed: {
    windowHeight () {
      return window.innerHeight
    }
  },
  mounted () {
    $route = useRouter()
  }
}
</script>

<style lang="sass" scoped>
.cona
  background: $secondary

.conb
  background: #F2C037
</style>
