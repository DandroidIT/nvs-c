import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dash', component: () => import('pages/home.vue') },
      { path: '/videowall', name: 'videowall', component: () => import('pages/videowall.vue') },
      { path: '/cam/:id', name: 'cam', component: () => import('pages/cam.vue') },
      { path: '/setup', name: 'setup', component: () => import('pages/setup.vue') },
      { path: '/settings', name: 'settings', component: () => import('pages/settings.vue') },
      /* { path: '/listalarms', name: 'listAlarms', component: () => import('pages/listalarms.vue') }, */
      { path: '/calendaralarms', name: 'calendarAlarms', component: () => import('pages/calendaralarms.vue') },
      /* { path: '/alarmdet/:id', name: 'alarmdet', component: () => import('pages/alarmdet.vue') }, */
    ],
  },
  { path: '/login', name: 'login', component: () => import('pages/login.vue') },
  { path: '/test', name: 'test', component: () => import('pages/test.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];


export default routes;
