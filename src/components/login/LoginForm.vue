<template>
  <div class="login">
    <v-alert
      v-if="errors.lenght || password.length <= 5 && password.length || email.length < 4 && email.length > 0 "
      class="errors animated fadeIn"
      :value="true"
      type="error"
    >
      <p
        v-if="password.length <= 5 && password.length > 0"
      >Your password need to have at least 6 characters </p>
      <p v-if="email.length < 4 && email.length > 0 ">Your email need to have at least 4 characters</p>
      <p v-if="errors.length">{{errors}}</p>
    </v-alert>
    <v-alert
      v-if="loggedInValid"
      class="success animated fadeIn"
      :value="true"
      type="success"
    > You have been logged in successfully! Redirecting to the profile!
    </v-alert>

    <v-form ref="form">
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
      <v-btn
        color="success"
        v-on:click="logIn"
        :disabled="Boolean(email.length < 6 || password.length < 6) || email.includes('@') == false"
      >Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import { timeout } from 'q';
import router from '../../router';
export default {
  name: "LoginForm",
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
      loggedInValid: false
    };
  },
  methods: {
    logIn() {
      console.log(this.email, this.password);
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      promise.then(e => {
        this.loggedInValid = true;
        setTimeout(function(){ location.replace('/');}, 850);
      }
    );
      promise.catch(e => (this.errors = e.message));
    }
  }
};
</script>

<style scoped>
.login {
  width: 450px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
}
  .login .v-alert {
    width: 100%;
  }
</style>
