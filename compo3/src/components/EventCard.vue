<script setup lang="ts">
import { type Event } from '@/types';
defineProps<{
  event: Event;
}>();
</script>

<template>
  <div v-if="event && event._id" class="event-card-wrapper">
    <RouterLink class="event-link" :to="{ name: 'passenger-layout-view', params: { id: event._id } }">
      <div class="event-card">
        <h2>{{ event.name }}</h2> 
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.event-card-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  text-align: center;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
