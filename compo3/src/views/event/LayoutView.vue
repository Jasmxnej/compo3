<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEventStore } from '@/stores/event';

const eventStore = useEventStore();
const event = computed(() => eventStore.event);
</script>

<template>
  <div>
    <div v-if="event">
      <h1>Passenger Name: {{ event.name }}</h1>
      <nav>
        <RouterLink :to="{ name: 'passenger-detail-view', params: { id: event._id } }">Passenger Detail</RouterLink> |
        <RouterLink :to="{ name: 'airline-detail-view', params: { id: event._id, airlineId: event.airline[0]._id } }">Airline Detail</RouterLink> |
        <RouterLink :to="{ name: 'event-edit-view', params: { id: event._id } }">Edit Passenger Detail</RouterLink>
      </nav>
      <RouterView :event="event" /> 
    </div>
    <div v-else>
      <p>Passenger not found or failed to load.</p>
    </div>
  </div>
</template>

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
