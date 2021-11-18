import { Router } from '@/Router';
import ExampleIndex from './pages/index';

export default new Router({
  routes: [
    {
      name: 'index',
      path: '/',
      component: ExampleIndex,
    },
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