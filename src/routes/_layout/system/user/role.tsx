import { FileRoute } from '@tanstack/react-router'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/system/user/role').createRoute({
  component: PageA
})

function PageA() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return (
    <div className="bg-white">
      <div>
        <Button shape="circle" icon={<ArrowLeftOutlined />}></Button>
      </div>
      <h1>aaa-role</h1>
      <h1>aaa-role</h1>
      <h1>aaa-role</h1>
      <h1>aaa-role</h1>
    </div>
  )
}
