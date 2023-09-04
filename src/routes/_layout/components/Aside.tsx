import React, { useLayoutEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import type MenuItem from 'antd/es/menu/MenuItem'
import { isEmpty } from 'lodash-es'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../_layout'
import menuIcons from './Icons'
import avatar from '@/assets/images/avatar.jpg'

interface IProps {
  collapsed: boolean
  onChange: (collapsed: boolean) => void
  user: any
}
type MenuItem = Required<MenuProps>['items'][number]
const Aside: React.FC<IProps> = props => {
  const { collapsed, onChange, user } = props
  const { auth } = useAuth()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const navigate = useNavigate()

  function LinkToPage(e: any) {
    if (e.key !== location.pathname) {
      if (e.key.indexOf('http') === 0) {
        window.open(e.key)
      } else {
        navigate({ to: e.key })
      }
    }
  }

  useLayoutEffect(() => {
    const keys = location.pathname.split('/')
    keys.splice(0, 1)
    setSelectedKeys([location.pathname])
    if (keys.length === 1) {
      setOpenKeys([])
    } else if (keys.length === 2) {
      setOpenKeys([`/${keys[0]}`])
    } else if (keys.length === 3) {
      setOpenKeys([`/${keys[0]}`, `/${keys[0]}/${keys[1]}`])
    }
  }, [location.pathname])

  function openChange(e: string[]) {
    console.log(e)
    if (!isEmpty(e) && e.length > 1) {
      const last = e[e.length - 1]
      const first = e[0]
      const isSub = last.indexOf(first) === 0
      if (isSub) {
        setOpenKeys(e)
      } else {
        setOpenKeys([last])
      }
    } else {
      setOpenKeys(e)
    }
  }

  const changeIcon = (name: string) => {
    if (!name) return null
    return menuIcons.get(name)
  }
  const getItem = (item: any, i): MenuItem => {
    return {
      key: item.key,
      icon: i === 0 ? changeIcon(item.meta?.icon) : null,
      children: item.children,
      label: item.meta?.title
    }
  }
  // 权限菜单接口转换成 antd-menu 需要的数据结构
  const loopMenu = (menus: any[], newArray: MenuItem[] = [], i = 0, path = '') => {
    menus.forEach((item: any) => {
      const obj = { ...item }
      obj.key = path ? `${path}/${obj.path}` : obj.path
      if (!isEmpty(obj?.children)) {
        const p = obj?.key || obj?.path
        obj.children = loopMenu(obj.children, [], i + 1, p)
      }
      newArray.push(getItem(obj, i))
    })
    return newArray
  }

  return (
    <div className="app-aside bg-white left-0 lg:left-50px">
      <div className="text-center py-5">
        <div className="size-70px inline-block rounded-full overflow-hidden border-3 border-dark/20">
          <img
            src={avatar}
            alt="avatar"
            onClick={() => navigate({ to: '/account' })}
            className="size-70px  object-cover cursor-pointer transition-all hover:scale-[1.1]"
          />
        </div>
        <div
          className="mx-2 text-lg text-primary cursor-pointer"
          onClick={() => navigate({ to: '/account' })}
        >
          <span className="">{user?.nickName}</span>
          <span className="text-xs text-color/30">/{user?.remark}</span>
        </div>
      </div>
      <Layout.Sider
        trigger={null}
        breakpoint="lg"
        theme="light"
        width={250}
        collapsible
        collapsed={collapsed}
        onBreakpoint={onChange}
      >
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          theme="light"
          mode="inline"
          items={loopMenu(auth.menu)}
          onOpenChange={openChange}
          onClick={LinkToPage}
        />
        <div className="text-center py-4 text-xs text-color/30">数据来源@若依</div>
      </Layout.Sider>
    </div>
  )
}

export default Aside
