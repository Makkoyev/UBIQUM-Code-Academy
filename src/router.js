import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Members from './views/Members.vue'
import RegistredMembers from './views/RegistredMembers.vue'
import CreateTeam from './views/CreateTeam.vue'
//import CreateMatch from './views/CreateMatch.vue'
import GameInformation from './views/GameInformation.vue'
import App from './App.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/add-member',
      name: 'member',
      component: Members
    },
    {
      path: '/registred-members',
      name: 'Registred',
      component: RegistredMembers
    },
    {
      path: '/create-team',
      name: 'Create Team',
      component: CreateTeam
    },
    {
      path: '/game-information',
      name: 'GameInformation',
      component: GameInformation
    }
  ]
})
