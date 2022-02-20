import { createRouter, createWebHistory } from 'vue-router'
import Top from '../pages/top';
import Contact from '../pages/contact';
import TitleIndex from '../pages/title/index';
import TitleShow from '../pages/title/show';

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/titles',
    name: 'TitleIndex',
    component: TitleIndex,
  },
  {
    path: '/titles/:id',
    name: 'TitleShow',
    component: TitleShow,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router