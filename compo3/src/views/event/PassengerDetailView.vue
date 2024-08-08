<script setup lang="ts">
  import { defineProps } from 'vue';
  import type { Event } from '@/types';
  
  const props = defineProps<{
    event: Event | null;
  }>();
</script>
<template>
    <div class="passenger-detail" v-if="event">
      <p>Id: {{ event._id }}</p>
      <p>Name: {{ event.name }}</p>
      <p>Trips: {{ event.trips }}</p>
      <ul>
        <li v-for="(airline, index) in event.airline" :key="index">
          <router-link :to="{ name: 'airline-detail-view', params: { airlineId: airline._id } }">
            <p>Airline: {{ airline.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  
    <div v-else>
      <p>Passenger not found or failed to load.</p>
    </div>
</template>  

  <style scoped>
  .passenger-detail {
    text-align: left;
    max-width: 300px;
    margin: 0 auto;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
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
  