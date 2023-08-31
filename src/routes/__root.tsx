import { Outlet, RootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { App, ConfigProvider, Spin, theme } from 'antd'
import { useCookieState } from 'ahooks'
import dayjs from 'dayjs'
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { Login } from './login'
import { TOKEN_KEY } from '@/constants'

dayjs.locale('zh')

const LAYOUT_WHITE_LIST = ['/login']
export const route = new RootRoute({
  component: Root
})

function Root() {
  const [token] = useCookieState(TOKEN_KEY)
  return (
    <>
      {/* <StyleProvider hashPriority="high"> */}
      <App>
        <ConfigProvider
          locale={zhCN}
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#3f74e5',
              colorPrimaryText: '#3f74e5',
              blue: '#3f74e5',
              borderRadius: 4
            }
          }}
        >
          <Suspense fallback={<Spin />}>
            {!token && !LAYOUT_WHITE_LIST.includes(window.location.pathname) ? (
              <Login />
            ) : (
              <Outlet />
            )}
            <Toaster richColors position="top-center" />
          </Suspense>
        </ConfigProvider>
      </App>
      {/* Start rendering router matches */}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
