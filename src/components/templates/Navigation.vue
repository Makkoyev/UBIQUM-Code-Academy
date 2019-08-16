  <template>
  <v-toolbar>
    <a href="/">
      <v-avatar size="64" class="red">
        <img src="../../assets/img/logo.png" alt="alt" />
      </v-avatar>
    </a>

    <v-toolbar-title>NYSL</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="navigation.home.url">{{navigation.home.name}}</v-btn>
      <v-btn flat v-if="!uid" :to="navigation.login.url">{{navigation.login.name}}</v-btn>
      <v-btn flat v-if="!uid" :to="navigation.register.url">{{navigation.register.name}}</v-btn>
      <v-btn flat v-if="uid" :to="navigation.profile.url">{{navigation.profile.name}}</v-btn>
      <v-btn flat v-if="uid" :to="navigation.member.url">{{navigation.member.name}}</v-btn>
      <v-btn flat v-if="uid" :to="navigation.createTeam.url">{{navigation.createTeam.name}}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Navigation",
  data: function() {
    return {
      // NOTE: DATA READY
      uid: localStorage.getItem("authStorage"),

      navigation: {
        home: {
          name: "Home",
          url: "/"
        },
        login: {
          name: "Login",
          url: "/login"
        },
        register: {
          name: "Register",
          url: "/register"
        },
        profile: {
          name: "Profile",
          url: "/profile"
        },
        member: {
          name: "Add Member",
          url: "/add-member"
        },
        registredMember: {
          name: "Registred Members",
          url: "/registred-members"
        },
        createTeam: {
          name: "Create Team",
          url: "/create-team"
        }
      }
    };
  }
};
</script>

<style scoped>
@-webkit-keyframes navBarEffect {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-moz-keyframes navBarEffect {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-o-keyframes navBarEffect {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes navBarEffect {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

nav ul li {
  /* NOTE: SAFARI */
  -webkit-animation: navBarEffect 0.5s forwards;
  /* NOTE: MOZILLA */
  -moz-animation: navBarEffect 0.5s forwards;
  /* NOTE: OPERA */
  -o-animation: navBarEffect 0.5s forwards;
  /* NOTE: IE / MOZILLA */
  animation: navBarEffect 0.5s forwards;
}
</style>
