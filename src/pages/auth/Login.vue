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
              v-model="form.pass"
              type="password"
              lazy-rules
              label="Password"
              :rules="[ val => val && val.length > 0 || 'Password cannot be empty']"
            />
            <q-btn class="q-mt-lg" label="Login" type="submit" lazy-rules
                   color="primary"/>
          </q-form>
        </q-page-container>
        <!-- video column-->
        <q-page-container
          class="conb col-md-8 video shadow-10 desktop-only overflow-hidden">
          <q-parallax :height="height">
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
import { reactive, ref } from 'vue'

export default {
  setup () {
    // console.log('props: ', props)
    const height = ref(window.innerHeight)
    const submit = () => {
      console.log('dasdas', form.pass)
      if (form.pass.length === 0) {
        console.log('sip')
        // TODO: remove
      }
      // this.$router.push({ name: 'home', query: { redirect: '/home' } })
    }
    const form = reactive({
      name: '',
      pass: '',
      email: ''
    })

    return {
      form,
      submit,
      height,
      onSubmit () {
        alert('holis')
      }
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
