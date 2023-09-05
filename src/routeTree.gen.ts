import { route as rootRoute } from './routes/__root'
import { route as LoginRoute } from './routes/login'
import { route as LayoutRoute } from './routes/_layout'
import { route as LayoutIndexRoute } from './routes/_layout/index'
import { route as LayoutSystemTestRoute } from './routes/_layout/system/test'
import { route as LayoutSystemMenuRoute } from './routes/_layout/system/menu'
import { route as LayoutSystemDictRoute } from './routes/_layout/system/dict'
import { route as LayoutAccountNoticeRoute } from './routes/_layout/account/notice'
import { route as LayoutAllRoute } from './routes/_layout/*.$all'
import { route as LayoutAccountIndexRoute } from './routes/_layout/account/index'
import { route as LayoutSystemUserRoleRoute } from './routes/_layout/system/user/role'
import { route as LayoutSystemRoleUserRoute } from './routes/_layout/system/role/user'
import { route as LayoutSystemLogOperlogRoute } from './routes/_layout/system/log.operlog'
import { route as LayoutSystemLogLogininforRoute } from './routes/_layout/system/log.logininfor'
import { route as LayoutSystemUserIndexRoute } from './routes/_layout/system/user/index'
import { route as LayoutSystemRoleIndexRoute } from './routes/_layout/system/role/index'

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
    '/_layout/account/': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/*/$all': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/account/notice': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/dict': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/menu': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/test': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/role/': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/user/': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/log/logininfor': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/log/operlog': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/role/user': {
      parentRoute: typeof LayoutRoute
    }
    '/_layout/system/user/role': {
      parentRoute: typeof LayoutRoute
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

Object.assign(LayoutAccountIndexRoute.options, {
  path: '/account/',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutAllRoute.options, {
  path: '/*/$all',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutAccountNoticeRoute.options, {
  path: '/account/notice',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemDictRoute.options, {
  path: '/system/dict',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemMenuRoute.options, {
  path: '/system/menu',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemTestRoute.options, {
  path: '/system/test',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemRoleIndexRoute.options, {
  path: '/system/role/',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemUserIndexRoute.options, {
  path: '/system/user/',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemLogLogininforRoute.options, {
  path: '/system/log/logininfor',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemLogOperlogRoute.options, {
  path: '/system/log/operlog',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemRoleUserRoute.options, {
  path: '/system/role/user',
  getParentRoute: () => LayoutRoute
})

Object.assign(LayoutSystemUserRoleRoute.options, {
  path: '/system/user/role',
  getParentRoute: () => LayoutRoute
})

export const routeTree = rootRoute.addChildren([
  LayoutRoute.addChildren([
    LayoutIndexRoute,
    LayoutAccountIndexRoute,
    LayoutAllRoute,
    LayoutAccountNoticeRoute,
    LayoutSystemDictRoute,
    LayoutSystemMenuRoute,
    LayoutSystemTestRoute,
    LayoutSystemRoleIndexRoute,
    LayoutSystemUserIndexRoute,
    LayoutSystemLogLogininforRoute,
    LayoutSystemLogOperlogRoute,
    LayoutSystemRoleUserRoute,
    LayoutSystemUserRoleRoute
  ]),
  LoginRoute
])
