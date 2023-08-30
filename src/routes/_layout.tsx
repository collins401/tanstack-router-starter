import { FileRoute, Link, Outlet } from '@tanstack/react-router'
import { Layout } from 'antd'
import Cookies from 'js-cookie'
import request from '@/utils/request'
import { TOKEN_KEY } from '@/constants'

// Create a new loader
async function fetchUser() {
  if (!Cookies.get(TOKEN_KEY)) {
    throw new Error('no token')
  }
  const res = await request(`/getInfo`)
  // if (res.code !== 200) throw new Error('Failed to fetch posts')
  return res
}

export const route = new FileRoute('/_layout').createRoute({
  component: LayoutPage,
  loader: () => fetchUser(),
  context: {
    user: {
      id: '123',
      name: 'John Doe'
    }
  }
})

function LayoutPage({ useLoader, useContext }: any) {
  // const { data: posts } = useLoader({ key: 'user' })
  const { user } = useLoader()
  console.log(user, useContext())
  return (
    <Layout className="!min-h-[100vh]">
      <Layout.Header>asd</Layout.Header>
      <Layout>
        <Layout.Content>
          <div> I m a layout</div>
          <div className="flex gap-2">
            <Link
              to="/a"
              activeProps={{
                className: 'font-bold'
              }}
            >
              Layout A
            </Link>
            <Link
              to="/c"
              activeProps={{
                className: 'font-bold'
              }}
            >
              Layout c
            </Link>
          </div>
          <div>
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
