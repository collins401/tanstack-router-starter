import { Link, createFileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const Route = createFileRoute('/_layout/system/role/user')({
  component: RoleUser
})

function RoleUser() {
  const { hasRole } = useAccess()
  return (
    <div className="p-2">
      role-user
      <Link to="/system/role">back</Link>
    </div>
  )
}
