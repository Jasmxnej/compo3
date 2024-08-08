<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Event, Airline } from '@/types';

const props = defineProps<{
  event: Event | null;
  airlineId: string;
}>();

const airline = computed(() => {
  return props.event?.airline.find((airline: Airline) => airline._id === props.airlineId) || null;
});
</script>

<template>
  <div class="airline-detail" v-if="airline">
    <img :src="airline.logo" alt="Airline Logo" width="100" />
    <p>Name: {{ airline.name }}</p>
    <p>Id: {{ airline._id }}</p>
    <p>Country: {{ airline.country }}</p>
    <p>Slogan: {{ airline.slogan }}</p>
    <p>Headquarters: {{ airline.head_quaters }}</p>
    <p>Established: {{ airline.established }}</p>
    <p>Website: <a :href="airline.website" target="_blank">{{ airline.website }}</a></p>
  </div>

  <div v-else>
    <p>Airline not found or failed to load.</p>
  </div>
</template>  

<style scoped>
.airline-detail {
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

img {
  display: block;
  margin: 20px auto; 
}

p {
  margin: 10px 0;
}

a {
  color: black; 
  text-decoration: none; 
}

a:hover {
  text-decoration: underline; 
}

router-link {
  color: black;
  text-decoration: none; 
}
</style>
