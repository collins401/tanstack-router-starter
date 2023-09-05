import { isEmpty } from 'lodash-es'
import { Button } from 'antd'
import { useAuth } from '../../_layout'
import ERROR from '@/assets/images/403.png'

export const AUTH_ROUTE_WHITE_LIST = ['/', '/login', '/account', '/account/notice']

function loopMenu(menus: any[], newArray: any = [], path = '') {
  menus.forEach((item: any) => {
    const obj = { ...item }
    obj.path = path ? `${path}/${obj.path}` : obj.path
    if (!isEmpty(obj?.children)) {
      const p = obj?.path
      obj.children = loopMenu(obj.children, [], p)
    }
    newArray.push(obj)
  })
  return newArray
}

function searchRoute(path: string, routes: any) {
  let result: any = {}

  for (const item of routes) {
    if (item.path === path) return item
    if (!isEmpty(item.children)) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

export default function Auth(props) {
  const { auth } = useAuth()
  console.log(auth.menu)

  const pathname = location.pathname

  const fulls = loopMenu(auth.menu)
  if (AUTH_ROUTE_WHITE_LIST.includes(pathname)) {
    return <>{props.children}</>
  }
  let access = searchRoute(pathname, fulls)

  if (isEmpty(access) && pathname.split('/').length > 3) {
    // 二、三级详情页查询权限
    access = searchRoute(pathname.split('/').slice(0, 3).join('/'), fulls)
  }
  if (isEmpty(access)) {
    return (
      <div className="p-5 min-h-[calc(100vh-115px)]">
        <div className="flex-between max-w-650px mx-auto pt-10">
          <div className="pt-10">
            <h2 className="text-primary text-3xl mb-7 font-500 ">403</h2>
            <p className="text-color/60">很抱歉， 您没有访问该资源的权限！</p>
            <Button type="primary">返回上一页</Button>
          </div>
          <div className="hidden flex-1 lg:text-right md:flex">
            <img src={ERROR} alt="404" className="w-400px" />
          </div>
        </div>
      </div>
    )
  }

  return <div>{props.children}</div>
}
