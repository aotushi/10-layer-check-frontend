import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HistoryView from '@/views/HistoryView.vue'
import HomeView from '@/views/HomeView.vue'
import LayerModelView from '@/views/LayerModelView.vue'
import LoginView from '@/views/LoginView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ReportDetailView from '@/views/ReportDetailView.vue'
import TechView from '@/views/TechView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/10-layer-model',
    alias: '/landing',
    name: 'layer-model',
    component: LayerModelView,
  },
  {
    path: '/tech',
    name: 'tech',
    component: TechView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      shell: 'auth',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      shell: 'auth',
    },
  },
  {
    path: '/dashboard/history',
    name: 'history',
    component: HistoryView,
    meta: {
      shell: 'product',
    },
  },
  {
    path: '/dashboard/reports/:id',
    name: 'report-detail',
    component: ReportDetailView,
    meta: {
      shell: 'product',
    },
  },
  {
    path: '/cases/:slug',
    name: 'case-detail',
    component: PlaceholderView,
    props: {
      title: 'Case Detail',
      description: 'Trust/proof case page for a public example report.',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
