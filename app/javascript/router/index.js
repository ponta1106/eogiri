import { createRouter, createWebHistory } from 'vue-router'
import Top from '../pages/top';
import Contact from '../pages/contact';
import PrivacyPolicy from '../pages/privacy_policy';
import TermsOfUse from '../pages/terms_of_use';
import TitleIndex from '../pages/title/index';
import TitleShow from '../pages/title/show';

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/terms_of_use',
    name: 'TermsOfUse',
    component: TermsOfUse,
  },
  {
    path: '/privacy_policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
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
    path: '/titles/:id/replies',
    name: 'TitleShow',
    component: TitleShow,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router