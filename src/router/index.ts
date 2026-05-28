import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { readAuthSession } from '@/api/auth-session'
import type { AuthSession } from '@/api/auth-session'
import type { UserRole } from '@/api/types'
import CaseDetailView from '@/views/CaseDetailView.vue'
import HistoryView from '@/views/HistoryView.vue'
import HomeView from '@/views/HomeView.vue'
import LayerModelView from '@/views/LayerModelView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ReportDetailView from '@/views/ReportDetailView.vue'
import TechView from '@/views/TechView.vue'
import { resolveAuthRedirect } from '@/router/redirect'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiredRole?: UserRole
    shell?: 'auth' | 'product'
  }
}

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
      requiresAuth: true,
      shell: 'product',
    },
  },
  {
    path: '/dashboard/reports/:id',
    name: 'report-detail',
    component: ReportDetailView,
    meta: {
      requiresAuth: true,
      shell: 'product',
    },
  },
  {
    path: '/cases/:slug',
    name: 'case-detail',
    component: CaseDetailView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const session = readAuthSession()

  if ((to.meta.requiresAuth || to.meta.requiredRole) && !session) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.requiredRole && !hasRequiredRole(session, to.meta.requiredRole)) {
    return { name: 'not-found' }
  }

  if ((to.name === 'login' || to.name === 'register') && session) {
    return resolveAuthRedirect(to.query.redirect)
  }
})

function hasRequiredRole(session: AuthSession | null, requiredRole: UserRole): boolean {
  const role = session?.user.role ?? 'user'
  return role === requiredRole
}
