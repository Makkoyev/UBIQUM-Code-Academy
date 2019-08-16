<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-text-field v-model="teamName" label="Team Name" required></v-text-field>
        <v-text-field v-model="teamLogo" label="Team Logo" required></v-text-field>
        <v-text-field v-model="teamCoach" label="Coach Name" required></v-text-field>
        <v-text-field v-model="mainColor" label="Main Color" required></v-text-field>
        <v-text-field v-model="secondaryColor" label="Secondary Color" required></v-text-field>
        <v-btn v-on:click="createTeam">Create Team</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
</style>
<script>
export default {
  name: "CreateTeam",
  data() {
    return {
      teamName: null,
      teamLogo: null,
      teamCoach: null,
      mainColor: null,
      secondaryColor: null
    };
  },
  methods: {
    createTeam() {
      var db = firebase.firestore();

      db.collection("teams")
        .doc(this.teamName)
        .set({
          teamName: this.teamName,
          teamLogo: this.teamLogo,
          teamCoach: this.teamCoach,
          mainColor: this.mainColor,
          secondaryColor: this.secondaryColor
        })
        .then(data => {
          (this.teamName = null),
            (this.teamLogo = null),
            (this.teamCoach = null),
            (this.mainColor = null),
            (this.secondaryColor = null);
        });
    }
  }
};
</script>

