import { FileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/system/log/operlog').createRoute({
  component: PageA
})

function PageA() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return <div className="p-2">log</div>
}
