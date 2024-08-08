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
  //list of passengers
  getEvents(size: number, page: number) {
    return apiClient.get('/passenger', {
      params: {
        size: size,
        page: page - 1, 
      },
    }).then(response => response.data);
  },

  // passenger by ID
  getEvent(id: string) {
    return apiClient.get(`/passenger/${id}`)
      .then(response => response.data);
  },

  // list of airlines
  getAirlines() {
    return apiClient.get('/airlines')
      .then(response => response.data);
  },

  // airline by ID
  getAirline(id: string) {
    return apiClient.get(`/airlines/${id}`)
      .then(response => response.data);
  }
};
