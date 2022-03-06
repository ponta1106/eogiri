import { createRouter, createWebHistory } from 'vue-router'
import Top from '../pages/top/top';
import Contact from '../pages/contact';
import PrivacyPolicy from '../pages/privacy_policy';
import TermsOfUse from '../pages/terms_of_use';
import Titles from '../pages/title/titles';
import Replies from '../pages/replies/replies';

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
    name: 'Titles',
    component: Titles,
  },
  {
    path: '/titles/:id/replies',
    name: 'Replies',
    component: Replies,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router