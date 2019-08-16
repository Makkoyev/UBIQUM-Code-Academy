<template>
  <div class="register">
    <v-card>
      <h1>Registration</h1>
      <RegisterForm />
    </v-card>
  </div>
</template>
<style scoped>
    .register {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  .register .v-card {
    padding: 2em;
    margin-top: 2em;
  }
</style>
<script>
// @ is an alias to /src
import RegisterForm from "@/components/register/RegisterForm.vue";

export default {
  name: "register",
  components: {
    RegisterForm
  },
  methods: {}
};
</script>
