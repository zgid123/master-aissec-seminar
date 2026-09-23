import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { DashboardPage } from './views/DashboardPage'
import { LoginPage } from './views/LoginPage'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <main className="center-page">Page not found</main>,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const routeTree = rootRoute.addChildren([dashboardRoute, loginRoute])

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
