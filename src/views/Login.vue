<template>
  <div class="login">
    <v-card>
      <h1>Login</h1>
      <LoginForm />
    </v-card>
  </div>
</template>
<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  .login .v-card {
    padding: 2em;
    margin-top: 2em;
  }
</style>
<script>
// @ is an alias to /src
import LoginForm from '@/components/login/LoginForm.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  },
  methods: {

  }
}
</script>
