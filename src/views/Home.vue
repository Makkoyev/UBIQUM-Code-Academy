<template>
  <div class="home">
    <div class="wrapper">
      <div class="hero-img">
        <h1 class="animated bounceInDown faster delay-1s">NYSL - Web App</h1>
        <div class="hero-content animated bounceIn faster delay-1s">
          <p>NYSL - Web App have been made using: Vue.js (with Routing), Vuetify.js, HTML5, CSS3, Javascript, Firebase(Firestore, Authentication, Storage)</p>
        </div>
      </div>
      <div class="wrapped-menu">
        <v-card color="grey lighten-5" flat width="100%">
          <v-toolbar dense class="hidden-sm-and-down">
            <v-btn flat href="#upcoming">Upcoming Events</v-btn>
            <v-btn flat href="#about">About us</v-btn>
            <v-btn flat href="#contact">Contacts</v-btn>
            <v-btn flat to="/game-information">Game Information</v-btn>
          </v-toolbar>
          <div class="home-section">
            <div id="upcoming">
              <h3>Upcoming Events</h3>

              <div class="upcoming-events">
                <v-layout v-for="(card, index) of cardEvents" :key="index">
                  <v-flex>
                    <v-card class="card-test">
                      <v-img :src="card.src"></v-img>

                      <v-card-title primary-title>
                        <div>
                          <h3 class="headline mb-0">{{cardEvents[index].cardTitle}}</h3>
                          <div>{{cardEvents[index].cardDescription}}</div>
                        </div>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-layout>
              </div>
            </div>
            <div id="about">
              <v-layout>
                <v-flex>
                  <v-card>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">About us</h3>
                        <div>
                          <h4>Mission</h4>
                          <p>To support young athletes living in Chicago's northside neighborhoods, who have an interest in learning and playing soccer, with opportunities to learn and practice skills related to the game of soccer, specifically those skills around team cooperation and good sportsmanship.</p>
                          <h4>Vision</h4>
                          <p>The Northside Youth Soccer League aspires to develop strong, well-rounded, and mindful athletes through the building of character, self-discipline, and leadership.</p>
                          <h4>General Information</h4>
                          <p>The Northside Youth Soccer League was established in 1996 to provide athletes residing in Chicago's northside neighborhoods an environment in which to learn and play soccer. To be a member of NYSL, you must be between the ages of 4 - 12 and reside in a Chicago northside neighborhood. NYSL is run by a small full-time staff, and relies on the generous volunteer time of parents and previous league members.</p>
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
            <div id="contact">
              <v-layout class="contact">
                <v-flex>
                  <v-card>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">Contacts</h3>
                        <div>
                          <p>
                            Please email us at
                            <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a>
                            We will reply to your email as soon as we can.
                          </p>
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Component from '@/components/Component.vue'
export default {
  name: "home",
  components: {},
  data() {
    return {
      matches: [],
      awayTeam: [],
      houseTeam: [],
      cardEvents: [
        {
          cardTitle: "August 4",
          cardDescription: "NYSL Fundraiser",
          src: "https://i.ibb.co/YLPZVny/img1.jpg"
        },
        {
          cardTitle: "August 16",
          cardDescription: "Season Kick-off: Meet the Teams",
          src: "https://i.ibb.co/kDCqDhH/img2.jpg"
        },
        {
          cardTitle: "September 1",
          cardDescription:
            "First Game of the Season (Check Game Schedule for details)",
          src: "https://i.ibb.co/FH9jz0B/img3.jpg"
        }
      ]
    };
  },
  mounted() {
    var db = firebase.firestore();
    let match = db.collection("matches");
    let matches = match
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.id, "=>", doc.data());
          this.matches.push(doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>
<style scoped>
.wrapped-menu > .v-card > .v-toolbar {
  display: flex;
  justify-content: center;
}
.hero-img {
  background: url(".././assets/img/hero-background.jpg") center center;
  background-size: cover;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-img h1 {
  padding: 6px;
  background: orange;
  margin: 6px;
  color: var(--dark-blue);
  text-transform: uppercase;
}

.hero-content p {
  padding: 6px;
  background: orange;
  margin: 6px;
  color: var(--dark-blue);
  max-width: 75%;
  margin: 0 auto;
  text-transform: uppercase;
  font-size: 14px;
}

.wrapper {
  height: 85vh;
  background: var(--dark-blue);
}
.home-section > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 12px;
  margin: 2em auto;
  border-radius: 15px;
}
.home-section > div > h3 {
  text-transform: uppercase;
}
.upcoming-events {
  display: flex;
}
.card-test {
  width: 250px;
  margin: 12px;
}
.contact {
  width: 100%;
}
@media screen and (max-width: 992px) {
  .card-test {
    width: 200px;
  }
}
@media screen and (max-width: 992px) {
  .card-test {
    width: 180px;
  }
}
@media screen and (max-width: 992px) {
  .upcoming-events {
    flex-direction: column;
  }
  .card-test {
    width: 100%;
  }
}
</style>
