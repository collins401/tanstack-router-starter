import React from 'react'
import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  UnlockOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Layout, Switch } from 'antd'
import type { MenuProps } from 'antd'
import { SvgIcon } from '@/components'

const Header: React.FC<{ name: string }> = props => {
  const items: MenuProps['items'] = [
    {
      label: '个人中心',
      icon: <UserOutlined />,
      key: '0'
    },
    {
      label: '修改密码',
      icon: <UnlockOutlined />,
      key: '1'
    },
    {
      type: 'divider'
    },
    {
      label: '退出系统',
      icon: <LogoutOutlined />,
      key: '3',
      danger: true
    }
  ]

  return (
    <Layout.Header className="!bg-primary pe-4 ps-4">
      <div className="flex">
        <div className="flex-1 text-2xl font-500 text-white leading-64px">Logo</div>
        <div className="flex items-center space-x-3">
          <Switch
            checkedChildren={<SvgIcon type="moon" />}
            unCheckedChildren={<SvgIcon type="sun" />}
          />
          <Badge dot>
            <BellOutlined className="text-xl text-white" />
          </Badge>
          <Dropdown menu={{ items }} trigger={['click']}>
            <span className="text-white transition-all space-x-2 inline-block leading-[36px] px-2 rounded-md hover:bg-dark/20 cursor-pointer">
              <Avatar icon={<UserOutlined />} size="small" />
              <span>{props?.name}</span>
              <DownOutlined className="text-xs" />
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}
export default Header
