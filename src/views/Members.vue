<template>
<div class="members">
  <AddMember />
</div>
</template>

<script>
// @ is an alias to /src
import AddMember from '@/components/members/AddMember.vue'

export default {
  name: 'members',
  components: {
      AddMember
  }
}
</script>
<style scoped>
.wrapped-menu > .v-card > .v-toolbar {
  display:flex;
  justify-content: center;
}
.hero-img {
  background: url('.././assets/img/hero-background.jpg') center center;
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
</style>
