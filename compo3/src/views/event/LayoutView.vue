<template>
    <div>
      <div v-if="loading">
        <p>Loading passenger details...</p>
      </div>
  
      <div v-else-if="event && event._id">
        <h1>Passenger Name: {{ event.name }}</h1>
        <nav>
          <router-link :to="{ name: 'passenger-detail-view', params: { id: event._id } }">Passenger Detail</router-link>
          |
          <router-link v-if="event.airline.length" :to="{ name: 'airline-detail-view', params: { airlineId: event.airline[0]._id } }">Airline Detail</router-link>
        </nav>
        <router-view :event="event" /> <!-- Pass event data to child routes -->
      </div>
  
      <div v-else>
        <p>Passenger not found or failed to load.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineProps } from 'vue';
  import EventService from '@/services/EventService';
  import { useRouter } from 'vue-router';
  import type { Event } from '@/types';
  
  const event = ref<Event | null>(null);
  const loading = ref(true);
  
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });
  
  const router = useRouter();
  
  function fetchEvent(id: string) {
    EventService.getEvent(id)
      .then((response) => {
        if (response) {
          event.value = response;
        } else {
          router.push({ name: '404-resource-view', params: { resource: 'event' } });
        }
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
        router.push({ name: '404-resource-view', params: { resource: 'event' } });
      })
      .finally(() => {
        loading.value = false;
      });
  }
  
  onMounted(() => {
    fetchEvent(props.id);
  });
  </script>
  
  <style scoped>
  nav {
    margin-bottom: 20px;
  }
  
  nav a {
    text-decoration: none;
    color: #2c3e50;
    margin: 0 10px;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  