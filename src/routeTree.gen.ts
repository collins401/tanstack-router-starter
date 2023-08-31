import { route as rootRoute } from './routes/__root'
import { route as LoginRoute } from './routes/login'
import { route as LayoutRoute } from './routes/_layout'
import { route as LayoutCRoute } from './routes/_layout/c'
import { route as LayoutARoute } from './routes/_layout/a'
import { route as LayoutAllRoute } from './routes/_layout/$all'
import { route as LayoutIndexRoute } from './routes/_layout/index'
import { route as LayoutSystemUserRoute } from './routes/_layout/system/user'
import { route as LayoutSystemDictRoute } from './routes/_layout/system/dict'
import { route as LayoutSystemDictIndexRoute } from './routes/_layout/system/dict/index'

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      parentRoute: typeof rootRoute
    }
    '/login': {
      parentRoute: typeof rootRoute
    }
    '/_layout/': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/$all': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/a': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/c': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/dict': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/user': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/dict/': {
      parentRoute: typeof LayoutSystemDictRoute
    }
  }
}

Object.assign(LayoutRoute.options, {
  id: '/layout',
  getParentRoute: () => rootRoute
})

Object.assign(LoginRoute.options, {
  path: '/login',
  getParentRoute: () => rootRoute
})

Object.assign(LayoutIndexRoute.options, {
  path: '/',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutAllRoute.options, {
  path: '/$all',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutARoute.options, {
  path: '/a',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutCRoute.options, {
  path: '/c',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemDictRoute.options, {
  path: '/system/dict',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemUserRoute.options, {
  path: '/system/user',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemDictIndexRoute.options, {
  path: '/',
  getParentRoute: () => LayoutSystemDictRoute
})

export const routeTree = rootRoute.addChildren([
  LayoutRoute.addChildren([
    LayoutIndexRoute,
    LayoutAllRoute,
    LayoutARoute,
    LayoutCRoute,
    LayoutSystemDictRoute.addChildren([LayoutSystemDictIndexRoute]),
    LayoutSystemUserRoute
  ]),
  LoginRoute
])
