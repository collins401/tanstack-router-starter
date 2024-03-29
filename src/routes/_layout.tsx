import { Suspense, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { Layout } from 'antd'
import { isEmpty } from 'lodash-es'
import Header from './_layout/-components/Header'
import Aside from './_layout/-components/Aside'
import Auth from './_layout/-components/Auth'
import { ErrorBoundary, Loading } from '@/components'
import { getUserInfo, getUserMenu } from '@/services/api'

export interface AuthContextType {
  auth: {
    permissions: string[]
    roles: string[]
    user: any
    menu: any
  }
}

const AuthContext = createContext<AuthContextType>(null!)

export function useAuth() {
  return useContext(AuthContext)
}

export const Route = createFileRoute('/_layout')({
  component: LayoutPage
})

function LayoutPage() {
  const router = useRouter()
  const breadcrumbs = router.state.matches.map(match => {
    const { routeContext } = match!
    console.log('match', match)
    return {
      title: routeContext?.getTitle?.(),
      path: match.pathname
    }
  })
  console.log('router', breadcrumbs)
  const [auth, setAuth] = useState<AuthContextType['auth']>()
  const [collapsed, setCollapsed] = useState(false)
  const contextValue = useMemo(
    () => ({
      auth
    }),
    [auth]
  )

  useEffect(() => {
    Promise.all([getUserInfo(), getUserMenu()]).then(([user, menu]) => {
      setAuth({
        permissions: user.permissions,
        roles: user.roles,
        user: user.user,
        menu: menu.data
      })
    })
  }, [])

  if (isEmpty(auth?.user)) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <Layout className="!min-h-[100vh]">
        <Header name={auth?.user.remark} />
        <Layout>
          <Aside user={auth?.user} collapsed={false} onChange={e => {}} />
          <div
            className="2xl:mr-40px flex-1"
            style={{
              transition: 'all 0.2s',
              padding: '1rem',
              position: 'relative',
              marginLeft: collapsed ? '80px' : '300px'
            }}
          >
            <Suspense fallback={<Loading />}>
              <ErrorBoundary>
                <Auth>
                  <Outlet />
                </Auth>
              </ErrorBoundary>
            </Suspense>
          </div>
        </Layout>
      </Layout>
    </AuthContext.Provider>
  )
}
