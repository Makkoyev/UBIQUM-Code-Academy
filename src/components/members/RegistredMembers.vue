<template>
  <v-container>
    <v-card>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="member in members">
          <template v-slot:header>
            <div>
              <h2>{{`${member.firstName} ${member.lastName}`}}</h2>
            </div>
          </template>
          <v-card>
            <v-card-text>
                <p>Student of <strong>{{member.closestSchool}}</strong></p>
                <p>City: <strong>{{member.cityName}}</strong></p>
                <p>Birth Date: <strong>{{member.birthDate}}</strong></p>
                <p>Email Address: <strong>{{member.emailAddress}}</strong></p>

                <p>Phone Number: <strong>{{member.contactPhone}}</strong></p>
                <p>Gender: <strong>{{member.genderSelect}}</strong></p>
                <p>Jersey Size: <strong>{{member.jerseySize}}</strong></p>
                <p>Shorts Size: <strong>{{member.shortSize}}</strong></p>

                <p>School Year: <strong>{{member.schoolYear}}</strong></p>
                <p>Position: <strong>{{member.playerPosition}}</strong></p>
                <p>ZIP Code: <strong>{{member.zipCode}}</strong></p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
  </v-container>
</template>
<style scoped>
</style>
<script>
export default {
  name: "RegistredMembers",
  data() {
    return {
      members: []
    };
  },
  beforeCreate() {
    var db = firebase.firestore();
    let target = db
      .collection("members")
      .doc("players")
      .collection(localStorage.getItem("authStorage"));
    let targets = target
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          this.members.push(doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>

