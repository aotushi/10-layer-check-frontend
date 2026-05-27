import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LayerModelView from '@/views/LayerModelView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
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
    component: PlaceholderView,
    props: {
      title: 'Login',
      description: 'Authentication entry point for report history and saved scans.',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: PlaceholderView,
    props: {
      title: 'Register',
      description: 'Account creation flow using the shared auth component contract.',
    },
  },
  {
    path: '/dashboard/history',
    name: 'history',
    component: PlaceholderView,
    props: {
      title: 'History',
      description: 'Authenticated table-first scan history view.',
    },
  },
  {
    path: '/dashboard/reports/:id',
    name: 'report-detail',
    component: PlaceholderView,
    props: {
      title: 'Report Detail',
      description: 'Detailed report view for findings, evidence rows, and layer status.',
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
