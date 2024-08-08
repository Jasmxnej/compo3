// src/services/EventService.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});



export default {
  // Function to fetch a list of passengers
  getEvents(size: number, page: number) {
    return apiClient.get('/passenger', {
      params: {
        size: size,
        page: page - 1, // Adjust for 0-based page index used by the API
      },
    }).then(response => response.data);
  },

  // Function to fetch a single passenger by ID
  getEvent(id: string) {
    return apiClient.get(`/passenger/${id}`)
      .then(response => response.data);
  },

  // Function to fetch a list of airlines
  getAirlines() {
    return apiClient.get('/airlines')
      .then(response => response.data);
  },

  // Function to fetch a single airline by ID
  getAirline(id: string) {
    return apiClient.get(`/airlines/${id}`)
      .then(response => response.data);
  }
};
