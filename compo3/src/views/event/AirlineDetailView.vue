<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import EventService from '@/services/EventService';
  import type { Airline } from '@/types';
  
  const airline = ref<Airline | null>(null);
  const route = useRoute();
  
  onMounted(() => {
    const airlineId = route.params.airlineId as string;
    if (airlineId) {
      EventService.getAirline(airlineId)
        .then((response) => {
          airline.value = response;
        })
        .catch((error) => {
          console.error('Error fetching airline data:', error);
        });
    }
  });
  </script>

<template>
    <div class="airline-detail" v-if="airline">
      <img :src="airline.logo" alt="Airline Logo" width="100" />
      <h2>{{ airline.name }}</h2>
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
    margin: 0 auto 30px; 
  }
  
  p, h2 {
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
  