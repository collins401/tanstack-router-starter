import { FileRoute, Link } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/system/role/user').createRoute({
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
