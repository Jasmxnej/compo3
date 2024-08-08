import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import PassengerLayoutView from '@/views/event/LayoutView.vue'
import PassengerDetailView from '@/views/event/PassengerDetailView.vue'
import AirlineDetailView from '@/views/event/AirlineDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout-view',
      component: PassengerLayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'passenger-detail-view',
          component: PassengerDetailView,
          props: route => ({ event: route.params.event }) 
        },
        {
          path: 'airline/:airlineId',
          name: 'airline-detail-view',
          component: AirlineDetailView,
          props: route => ({ airline: route.params.airline }) 
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ]
})

export default router
