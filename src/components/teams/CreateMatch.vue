<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-alert
          v-if="Boolean(house == away)"
          :value="true"
          type="error"
        >You need to choose different Teams!</v-alert>

        <v-flex xs12 sm12 d-flex>
          <v-select v-model="house" :items="items" label="House"></v-select>
          <v-select v-model="away" :items="items" label="Away"></v-select>
        </v-flex>
        <v-btn
          v-on:click="createMatch"
          :disabled="Boolean(house === away || !house.length || !away.length)"
        >Create Match</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
</style>
<script>
import { log } from "util";
export default {
  name: "CreateMatch",
  data() {
    return {
      house: [],
      away: [],
      items: []
    };
  },
  beforeCreate() {
    var db = firebase.firestore();
    let target = db.collection("teams");
    let targets = target
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          this.items.push(doc.id);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  },
  methods: {
    createMatch() {
      var db = firebase.firestore();

      db.collection("matches")
        .doc()
        .set({
          houseTeam: this.house,
          awayTeam: this.away,
        })
        .then(data => {
          (this.house = []),
            (this.away = [])
        });
    }
  }
};
</script>
