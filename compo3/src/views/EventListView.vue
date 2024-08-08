<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import { type Event } from '@/types';
import { ref, onMounted, computed, watch } from 'vue';
import EventService from '@/services/EventService';  // Import EventService correctly
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const events = ref<Event[]>([]);
const totalEvents = ref(0);
const pageSize = ref(Number(route.query.pageSize) || 5);
const page = ref(Number(route.query.page) || 1);

/* Calculate total pages and check if there is a next page */
const totalPages = computed(() => Math.ceil(totalEvents.value / pageSize.value));
const hasNextPage = computed(() => page.value < totalPages.value);
const hasPrevPage = computed(() => page.value > 1);

function fetchEvents() {
  EventService.getEvents(pageSize.value, page.value)
    .then((response) => {
      console.log('API Response:', response);  // Log the response to inspect

      // Map the response to events
      events.value = response.data.map((item: any) => ({
        _id: item._id,
        name: item.name,
        trips: item.trips,
        airline: item.airline,
      }));

      // Set totalEvents based on API response
      totalEvents.value = response.totalPassengers || 0;
    })
    .catch((error) => {
      console.error('There was an error fetching events!', error);
    });
}

onMounted(() => {
  if (!route.query.pageSize || !route.query.page) {
    router.replace({
      name: 'event-list-view',
      query: { pageSize: pageSize.value, page: page.value },
    });
  }
  fetchEvents();
});

watch([pageSize, page], () => {
  fetchEvents();
});

// Function to handle page size change
function updatePageSize(size: number) {
  pageSize.value = size;
  page.value = 1; // Reset to page 1 when page size changes
  router.push({
    name: 'event-list-view',
    query: {
      pageSize: pageSize.value,
      page: page.value,
    },
  });
}

function changePage(newPage: number) {
  page.value = newPage;
  router.push({
    name: 'event-list-view',
    query: {
      pageSize: pageSize.value,
      page: page.value,
    },
  });
}
</script>

<template>
  <h1>Passengers</h1>
  
  <div class="page-size-selector">
    <label for="page-size">Passengers per page:</label>
    <select id="page-size" v-model="pageSize" @change="updatePageSize(pageSize)">
      <option v-for="n in [5, 10, 15, 20, 25, 30]" :key="n" :value="n">{{ n }}</option>
    </select>
  </div>
  
  <div class="events">
    <EventCard v-for="event in events" :key="event._id" :event="event" />
  </div>
  
  <div class="pagination" v-if="totalPages > 0">
    <!-- Previous Page Link -->
    <RouterLink
      v-if="hasPrevPage"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }"
      @click.prevent="changePage(page - 1)"
      rel="prev"
      class="page-prev"
    >
      &#60; Prev Page
    </RouterLink>

    <!-- Next Page Link -->
    <RouterLink
      v-if="hasNextPage"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }"
      @click.prevent="changePage(page + 1)"
      rel="next"
      class="page-next"
    >
      Next Page &#62;
    </RouterLink>
  </div>

  <div v-if="totalEvents === 0">
    <p>No events available.</p>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
}

.page-size-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.page-size-selector label {
  margin-right: 10px;
}

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: space-between;
  width: 290px;
  margin: 20px auto 0;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

.page-prev {
  text-align: left;
}

.page-next {
  text-align: right;
}
</style>
