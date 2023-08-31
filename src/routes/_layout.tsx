import { Suspense, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { FileRoute, Outlet } from '@tanstack/react-router'
import { Layout } from 'antd'
import { isEmpty } from 'lodash-es'
import Header from './_layout/components/Header'
import Aside from './_layout/components/Aside'
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

export const route = new FileRoute('/_layout').createRoute({
  component: LayoutPage
})

function LayoutPage() {
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
            className="2xl:mr-40px"
            style={{
              transition: 'all 0.2s',
              padding: '1rem',
              position: 'relative',
              marginLeft: collapsed ? '80px' : '300px'
            }}
          >
            <Suspense fallback={<Loading />}>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </Suspense>
          </div>
        </Layout>
      </Layout>
    </AuthContext.Provider>
  )
}
