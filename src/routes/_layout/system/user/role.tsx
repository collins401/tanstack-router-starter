import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useAccess from '@/hooks/useAccess'

export const Route = createFileRoute('/_layout/system/user/role')({
  component: UserRole
})

function UserRole() {
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
