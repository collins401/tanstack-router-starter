import { isEmpty } from 'lodash-es'
import { Result } from 'antd'
import { useAuth } from '../../_layout'

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
      <Result
        title="系统提示"
        status="403"
        subTitle="抱歉，您没有查看、编辑相关信息，或者进行相关功能操作的权限"
      />
    )
  }

  return <div>{props.children}</div>
}
