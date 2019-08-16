<template>
<v-layout row pt-5>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px">
        <v-layout column fill-height>
          <v-card-title>
            <v-flex align-center justify-center text-xs-center>
              <v-avatar size="150" color="grey lighten-4">
                <img :src="memberData.photoURL" v-if="memberData.photoURL" class="avatar">
                <input type="file" id="selectedFile" style="display: none;" v-on:change="uploadAvatar" />
              </v-avatar>
            </v-flex>
          </v-card-title>
          <v-card-title class="white--text">
            <div class="display-1 pl-5 pt-5">{{memberData.displayName}}</div>
          </v-card-title>
        </v-layout>
      </v-img>

      <v-list two-line>
        <div>
          <v-list-tile v-on:click="triggerBrowser">
            <v-list-tile-action>
              <v-icon color="indigo">photo</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Upload Avatar</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>


        <v-list-tile v-on:click="profileMenu.updateEmail.state = !profileMenu.updateEmail.state">
          <v-list-tile-action>
            <v-icon color="indigo">{{profileMenu.updateEmail.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{profileMenu.updateEmail.item}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-flex xs10 sm8 offset-sm2 offset-xs1>
          <v-form v-if="profileMenu.updateEmail.state" class="animated bounceInLeft faster">
            <v-text-field v-model="profileMenu.updateEmail.data" :label="profileMenu.updateEmail.label" required></v-text-field>
            <v-btn class="white--text" color="green" v-on:click="updateEmail" :disabled="Boolean(profileMenu.updateEmail.data.includes('@') == false || profileMenu.updateEmail.data.length <= 6)">Save</v-btn>
            <v-btn v-on:click="profileMenu.updateEmail.state = !profileMenu.updateEmail.state" color="red" dark>Cancel</v-btn>
          </v-form>
        </v-flex>




        <v-list-tile v-on:click="profileMenu.updateName.state = !profileMenu.updateName.state">
          <v-list-tile-action>
            <v-icon color="indigo">{{profileMenu.updateName.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{profileMenu.updateName.item}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-flex xs10 sm8 offset-sm2 offset-xs1>
          <v-form v-if="profileMenu.updateName.state" class="animated bounceInLeft faster">
            <v-text-field v-model="profileMenu.updateName.data" :label="profileMenu.updateName.label" required></v-text-field>
            <v-btn class="white--text" color="green" v-on:click="updateName" :disabled="Boolean(profileMenu.updateName.data.length <= 4)">Save</v-btn>
            <v-btn v-on:click="profileMenu.updateName.state = !profileMenu.updateName.state" color="red" dark>Cancel</v-btn>
          </v-form>
        </v-flex>




        <v-list-tile v-on:click="profileMenu.updatePassword.state = !profileMenu.updatePassword.state">
          <v-list-tile-action>
            <v-icon color="indigo">{{profileMenu.updatePassword.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{profileMenu.updatePassword.item}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-flex xs10 sm8 offset-sm2 offset-xs1>
          <v-form v-if="profileMenu.updatePassword.state" class="animated bounceInLeft faster">
            <v-text-field type="password" v-model="profileMenu.updatePassword.data" :label="profileMenu.updatePassword.label" required></v-text-field>
            <v-text-field type="password" v-model="profileMenu.updatePassword.confirm" :label="profileMenu.updatePassword.labelConfirm" required></v-text-field>
            <v-btn class="white--text" color="green" v-on:click="updatePassword" :disabled="Boolean(profileMenu.updatePassword.data.length < 6 || profileMenu.updatePassword.data != profileMenu.updatePassword.confirm)">Save</v-btn>
            <v-btn v-on:click="profileMenu.updatePassword.state = !profileMenu.updatePassword.state" color="red" dark>Cancel</v-btn>
          </v-form>
        </v-flex>



        <v-list-tile v-on:click="registredMembers">
          <v-list-tile-action>
            <v-icon color="indigo">assignment_ind</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Registred Members</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="signOut">
          <v-list-tile-action>
            <v-icon color="indigo">launch</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Signout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>



        <v-list-tile v-on:click="deleteAccount">
          <v-list-tile-action>
            <v-icon color="indigo">delete</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import { log } from 'util';
export default {}
</script>

<style lang="css" scoped>
.avatar {
    object-fit: cover;
}
</style>

<script>
import router from '../../router'
export default {
  name: 'EditAvatar',
  data: function() {
    return {
      // NOTE: DATA
      memberData: {
        uid: localStorage.getItem('authStorage'),
        photoURL: localStorage.getItem('photoURL'),
        displayName: localStorage.getItem('displayName')
      },
      profileMenu: {
        updateEmail: {
          item: 'Change you email address',
          state: false,
          icon: 'alternate_email',
          label: 'Email Address',
          data: ''
        },
        updateName: {
          item: 'Change you full name',
          state: false,
          icon: 'account_circle',
          label: 'Full Name',
          data: ''
        },
        updatePassword: {
          item: 'Change your password',
          state: false,
          icon: 'vpn_key',
          label: 'Change Password',
          data: '',
          confirm: '',
          labelConfirm: 'Confirm Password'
        }
      }
    }
  },
  methods: {
    signOut(){
      firebase.auth().signOut();
      location.replace('/')
    },
    deleteAccount() {
      var user = firebase.auth().currentUser;

      user.delete().then(function() {
        console.log("User deleted");
      }).catch(function(error) {
        console.log(error);
      });
    },
    updateEmail() {
      var user = firebase.auth().currentUser;

      user.updateEmail(this.profileMenu.updateEmail.data).then(function() {
        console.log("Email changed");
      }).catch(function(error) {
        console.log(error);
      });
    },
    updateName() {
      firebase.auth().currentUser.updateProfile({
          displayName: this.profileMenu.updateName.data
        })
        .then(res => localStorage.setItem('displayName', firebase.auth().currentUser.displayName))
        .catch(err => console.log(err))
        setTimeout(function(){ location.reload() }, 450);
    },
    updatePassword() {
      var user = firebase.auth().currentUser;
      var newPassword = this.profileMenu.updatePassword.data;

      user.updatePassword(newPassword).then(function() {
        console.log("New password updated");
      }).catch(function(error) {
        console.log(error);
      });
    },
    // TODO: UPLOAD COVER
    triggerBrowser() {
      document.getElementById('selectedFile').click();
    },
    uploadAvatar(e) {
      var file = new Blob([e.target.files[0]], {
        type: `${e.target.files[0].type}`
      });
      console.log(file.size);
      console.log(e.target.files[0].type);

      var target = firebase.storage().ref(`${this.memberData.uid}/` + 'profileImage');

      console.log(target);
      var uploadTask = target.put(file);
      var imageURL = this.memberData.displayName;
      console.log(imageURL);
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
      }, function(error) {
        console.log(error);
        // Handle unsuccessful uploads
      }, function() {
        console.log("Image uploaded");
        // Handle successful uploads on complete
        target.getDownloadURL().then(function(url) {
          firebase.auth().currentUser.updateProfile({
            photoURL: url
          }).then(function() {
            location.reload();
          }).catch(function(error) {
            console.log("Error uploading the image")
          });
          imageURL = url;
          console.log("Got download URL", url);
          localStorage.setItem('photoURL', url);
        });
        this.profileImage = imageURL;
      });
    },
    registredMembers(){
      router.replace('registred-members')
    }
  }
}
</script>

<style scoped>

</style>
