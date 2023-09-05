import { FileRoute, Link } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/system/role/').createRoute({
  component: RolePage
})

function RolePage() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return (
    <div className="p-2">
      role
      <Link to="user">to user</Link>
    </div>
  )
}
