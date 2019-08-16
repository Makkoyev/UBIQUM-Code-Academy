<template>
  <v-container>
    <form>
      <v-card>
        <v-card-text>
          <v-layout row>
            <v-text-field v-model="sendForm.personalInfo.firstName" label="First name" required></v-text-field>
            <v-text-field v-model="sendForm.personalInfo.lastName" label="Last name" required></v-text-field>
            <v-text-field v-model="sendForm.personalInfo.birthDate" label="Birth Date" required></v-text-field>
          </v-layout>
          <v-layout row>
            <v-text-field
              v-model="sendForm.personalInfo.streetAddress"
              label="Street Address"
              required
            ></v-text-field>
            <v-text-field v-model="sendForm.personalInfo.cityName" label="City" required></v-text-field>
            <v-text-field v-model="sendForm.personalInfo.zipCode" label="ZIP Code" required></v-text-field>
          </v-layout>
          <v-layout row>
            <v-text-field
              v-model="sendForm.personalInfo.contactPhone"
              label="Contact phone"
              required
            ></v-text-field>
            <v-text-field
              v-model="sendForm.personalInfo.emailAddress"
              label="E-Mail address"
              required
            ></v-text-field>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-radio-group row label="Gender: " v-model="sendForm.personalInfo.genderSelect">
              <v-radio label="Male" value="Male" color="blue"></v-radio>
              <v-radio label="Female" value="Female" color="pink"></v-radio>
            </v-radio-group>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-radio-group row label="Grade" v-model="sendForm.personalInfo.schoolYear">
              <v-radio label="Pre-school" value="Pre-school"></v-radio>
              <v-radio label="1st" value="1st"></v-radio>
              <v-radio label="2nd" value="2nd"></v-radio>
              <v-radio label="3rd" value="3rd"></v-radio>
              <v-radio label="4th" value="4th"></v-radio>
              <v-radio label="5th" value="5th"></v-radio>
            </v-radio-group>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-select
              :items="schools"
              label="Closest elementary school"
              v-model="sendForm.personalInfo.closestSchool"
            ></v-select>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-radio-group
              row
              label="What position(s) do you want to play?"
              v-model="sendForm.personalInfo.playerPosition"
            >
              <v-radio label="Forward" value="Forward"></v-radio>
              <v-radio label="Defense" value="Defense"></v-radio>
              <v-radio label="Midfield" value="Midfield"></v-radio>
              <v-radio label="Goalkeeper" value="Goalkeeper"></v-radio>
            </v-radio-group>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-radio-group row label="Jersey Size:" v-model="sendForm.personalInfo.jerseySize">
              <v-radio label="Youth Small" value="Youth Small"></v-radio>
              <v-radio label="Youth Medium" value="Youth Medium"></v-radio>
              <v-radio label="Youth Large" value="Youth Large"></v-radio>
              <v-radio label="Youth Extra Large" value="Youth Extra Large"></v-radio>
            </v-radio-group>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-radio-group row label="Shorts Size:" v-model="sendForm.personalInfo.shortSize">
              <v-radio label="Youth Small" value="Youth Small"></v-radio>
              <v-radio label="Youth Medium" value="Youth Medium"></v-radio>
              <v-radio label="Youth Large" value="Youth Large"></v-radio>
              <v-radio label="Youth Extra Large" value="Youth Extra Large"></v-radio>
            </v-radio-group>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text>
          <v-layout align-center>
            <v-checkbox v-model="enabled" hide-details class="shrink mr-2"></v-checkbox>
            <v-text-field :disabled="!enabled" label="Signature"></v-text-field>
          </v-layout>
        </v-card-text>
      </v-card>
    </form>
    <v-btn v-on:click="addMember">Submit</v-btn>
  </v-container>
</template>
<style scoped>
.v-card {
  margin: 2em 0 2em 0;
}
.v-text-field {
  margin: 5px;
}
</style>
<script>
export default {
  name: "AddMember",
  data() {
    return {
      schools: [
        "Escola Josep Maria de Sagarra",
        "Escola Pau Casals Gràcia",
        "English School Barcelona",
        "FEDAC Sant Andreu",
        "Escola Poeta Foix",
        "Escola Joan Pelegrí - Infantil i Primària",
        "Benjamin Franklin International School",
        "CEIP Patronat Domènech",
        "Escola els Pins",
        "Petit KINDER"
      ],
      enabled: false,
      sendForm: {
        personalInfo: {
          firstName: null,
          lastName: null,
          streetAddress: null,
          cityName: null,
          zipCode: null,
          birthDate: null,
          contactPhone: null,
          emailAddress: null,
          genderSelect: null,
          schoolYear: null,
          closestSchool: null,
          playerPosition: null,
          jerseySize: null,
          shortSize: null
        },
        schoolInfo: {},
        playerInfo: {}
      }
    };
  },
  methods: {
    addMember() {
      var db = firebase.firestore();

      db.collection("members")
        .doc("players")
        .collection(localStorage.getItem("authStorage"))
        .doc()
        .set({
          firstName: this.sendForm.personalInfo.firstName,
          lastName: this.sendForm.personalInfo.lastName,
          streetAddress: this.sendForm.personalInfo.streetAddress,
          cityName: this.sendForm.personalInfo.cityName,
          zipCode: this.sendForm.personalInfo.zipCode,
          birthDate: this.sendForm.personalInfo.birthDate,
          contactPhone: this.sendForm.personalInfo.contactPhone,
          emailAddress: this.sendForm.personalInfo.emailAddress,
          genderSelect: this.sendForm.personalInfo.genderSelect,
          schoolYear: this.sendForm.personalInfo.schoolYear,
          closestSchool: this.sendForm.personalInfo.closestSchool,
          playerPosition: this.sendForm.personalInfo.playerPosition,
          jerseySize: this.sendForm.personalInfo.jerseySize,
          shortSize: this.sendForm.personalInfo.shortSize
        })
        .then(data => {
          (this.sendForm.personalInfo.firstName = null),
            (this.sendForm.personalInfo.lastName = null),
            (this.sendForm.personalInfo.streetAddress = null),
            (this.sendForm.personalInfo.cityName = null),
            (this.sendForm.personalInfo.zipCode = null),
            (this.sendForm.personalInfo.birthDate = null),
            (this.sendForm.personalInfo.contactPhone = null),
            (this.sendForm.personalInfo.emailAddress = null),
            (this.sendForm.personalInfo.genderSelect = null),
            (this.sendForm.personalInfo.schoolYear = null),
            (this.sendForm.personalInfo.closestSchool = null),
            (this.sendForm.personalInfo.playerPosition = null),
            (this.sendForm.personalInfo.jerseySize = null),
            (this.sendForm.personalInfo.shortSize = null);
        });
    }
  }
};
</script>

