<template>
<v-container>
   <v-card v-for="(match, index) in matches" :key="index" class="mt-2">
          <v-card-text class="match-info">
            <div>
              <v-avatar :size="100" color="grey lighten-4">
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
              </v-avatar>
              <h3>{{match.awayTeam}}</h3>
            </div>
            <div class="vs">
              <h1>VS</h1>
            </div>
            <div>
              <v-avatar :size="100" color="grey lighten-4">
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
              </v-avatar>
              <h3>{{match.houseTeam}}</h3>
            </div>
          </v-card-text>
        </v-card>
  </v-container>
</template>
<style scoped>
.match-info {
  display: flex;
  justify-content: space-evenly;
}
.match-info > div > h3 {
  text-align: center;
  padding: 12px;
  text-transform: uppercase;
}
.v-avatar > img {
  object-fit: cover;
}
.vs {
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
<script>
export default {
  name: "GameInformation",
  data() {
    return {
      matches: [],
      awayTeam: [],
      houseTeam: []
    };
  },
  mounted() {
    var db = firebase.firestore();
    let match = db.collection("matches");
    let matches = match
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          this.matches.push(doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>
