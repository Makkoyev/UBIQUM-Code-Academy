<template>
  <div class="registration">
    <div class="errors">
      <div v-if="validation.errors.length">
        <small v-for="error in validation.errors">{{error}}</small>
      </div>
      <p
        v-if="userData.password.length <= 5 && userData.password.length > 0"
      >Your password need to have at least 6 characters</p>
      <p
        v-if="userData.fullName.length < 4 && userData.fullName.length > 0"
      >Your name need to have at least 4 characters</p>
      <p v-if="userData.password !== userData.confirmPassword">The passwords doesn't match!</p>
    </div>



    <v-form ref="form">
      <v-text-field v-model="userData.fullName" label="Full Name" required></v-text-field>
      <v-text-field v-model="userData.eMail" label="Email" required></v-text-field>
      <v-text-field v-model="userData.password" type="password" label="Password" required></v-text-field>
      <v-text-field v-model="userData.confirmPassword" type="password" label="Confirm Password" required></v-text-field>
      <v-btn
        color="success"
        v-on:click="signUp"
        :disabled="Boolean(userData.password !== userData.confirmPassword || userData.password == '' || userData.confirmPassword == '' || userData.password.length <= 5 || userData.fullName.length < 4 || userData.eMail.includes('@') == false )"
      >Register</v-btn>
    </v-form>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: "Form",
  data() {
    return {
      title: "This is registration Form component",
      userData: {
        fullName: "",
        eMail: "",
        password: "",
        confirmPassword: ""
      },
      validation: {
        errors: []
      }
    };
  },
  methods: {
    signUp() {
      console.log(
        this.userData.fullName,
        this.userData.eMail,
        this.userData.password
      );
      const auth = firebase.auth();
      const create = auth.createUserWithEmailAndPassword(
        this.userData.eMail,
        this.userData.password
      );
      create.then(
        response =>
          auth.currentUser.sendEmailVerification() &&
          auth.currentUser
            .updateProfile({
              displayName: this.userData.fullName
            })
            .then(res =>
              localStorage.setItem("displayName", this.userData.fullName)
            )
            .catch(err => console.log(error))
      );
      create.catch(error => (this.validation.errors = error.message));
    }
  }
};
</script>

<style scoped>
.registration {
  width: 450px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
}
  .registration .v-alert {
    width: 100%;
  }
</style>
