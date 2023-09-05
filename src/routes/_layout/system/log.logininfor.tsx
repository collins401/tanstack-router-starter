import { FileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/system/log/logininfor').createRoute({
  component: Logininfor
})
function Logininfor() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return <div className="p-2">logininfor</div>
}
