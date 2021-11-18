import { Router } from '@/Router';

export default new Router({
  routes: [
    {
      name: 'button',
      path: '/button',
      component: () => import('./pages/ExampleButton'),
    },
    {
      name: 'svg-icon',
      path: '/svg-icon',
      component: () => import('./pages/ExampleSvgIcon'),
    },
    {
      name: 'table',
      path: '/table',
      component: () => import('./pages/ExampleSvgIcon'),
    },
    {
      name: 'tabs',
      path: '/tabs',
      component: () => import('./pages/ExampleTabs'),
    },
  ],
  notFound: 'button',
});