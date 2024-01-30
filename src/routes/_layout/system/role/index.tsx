import { Link, createFileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const Route = createFileRoute('/_layout/system/role/')({
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
