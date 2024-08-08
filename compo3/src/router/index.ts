import { createRouter, createWebHistory } from 'vue-router';
import EventListView from '@/views/EventListView.vue';
import AboutView from '@/views/AboutView.vue';
import PassengerLayoutView from '@/views/event/LayoutView.vue';
import PassengerDetailView from '@/views/event/PassengerDetailView.vue';
import AirlineDetailView from '@/views/event/AirlineDetailView.vue';
import EventEditView from '@/views/event/EditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import nProgress from 'nprogress';
import EventService from '@/services/EventService';
import { useEventStore } from '@/stores/event';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout-view',
      component: PassengerLayoutView,
      props: true,
      beforeEnter: async (to, from, next) => {
        const eventStore = useEventStore();
        const id = to.params.id as string;
        try {
          const event = await EventService.getEvent(id);
          if (event) {
            eventStore.setEvent(event);
            next();
          } else {
            next({ name: '404-resource-view', params: { resource: 'passenger' } });
          }
        } catch (error) {
          console.error('Error fetching event data:', error);
          next({ name: 'network-error-view', params: { resource: 'page' } });
        }
      },
      children: [
        {
          path: '',
          name: 'passenger-detail-view',
          component: PassengerDetailView,
          props: true,
        },
        {
          path: 'airline/:airlineId',
          name: 'airline-detail-view',
          component: AirlineDetailView,
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
  ],
  scrollBehavior(to, from,savedPosition){
    if(savedPosition){
      return savedPosition
    } else{
      return {top:0}
    }
  } 
})
router.beforeEach(()=>{
  nProgress.start()
})
router.afterEach(()=>{
  nProgress.done()
});

export default router;
