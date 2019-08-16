<template>
<v-app id="app">
  <Navigation v-bind:uid="uid" />
  <router-view />
    <v-footer class="mt-4">
    <div>&copy; {{ new Date().getFullYear() }} - Yevgeniy Makkoyev</div>
  </v-footer>
</v-app>
</template>

<style>
/* NOTE: ROOT COLORS PALETTE */
@import url('https://fonts.googleapis.com/css?family=Quicksand:300,400&display=swap');
#app {
  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
}
.v-footer {
  display: flex;
  justify-content: center;
}
</style>

<script>
import route from './router'

import Navigation from '@/components/templates/Navigation.vue'
export default {
  components: {
    Navigation
  },
  data: function() {
    return {
      // NOTE: READY FOR DATA
      loggedIn: false,
      uid: []
    }
  },
  methods: {
    getFirebase() {
      console.log("Mounted");
    }
  },
  computed: {

  },
  beforeCreate() {
    // NOTE: FIREBASE INITIALIZED
    var config = {
      apiKey: "AIzaSyDMdyu8E0kbcFU0m80N6r-wBDwRJN6UzLc",
      authDomain: "vue-firebase-63207.firebaseapp.com",
      databaseURL: "https://vue-firebase-63207.firebaseio.com",
      projectId: "vue-firebase-63207",
      storageBucket: "gs://vue-firebase-63207.appspot.com/",
      messagingSenderId: "651253526269",
      appId: "1:651253526269:web:1b105980cdd0faee"
    };
    firebase.initializeApp(config);

    console.log(firebase.auth().currentUser);

//firebase.auth().currentUser = user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (localStorage.getItem('authStorage') == null) {
          console.log("No data! We are getting it...", user.uid);
          localStorage.setItem('authStorage', user.uid);
          localStorage.setItem('photoURL', user.photoURL);
          localStorage.setItem('displayName', user.displayName);
          console.log("Got it!");
        } else {
          console.log("You already have the localStore!");
          this.uid = localStorage.getItem('authStorage');
          console.log("Your uid become: ", this.uid, "From localStore");

        }
      } else {
        console.log("Non sei connesso!");
        localStorage.clear();
      }
    })
  }
}
</script>
