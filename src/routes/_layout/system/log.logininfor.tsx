import { createFileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const Route = createFileRoute('/_layout/system/log/logininfor')({
  component: Logininfor
})
function Logininfor() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return <div className="p-2">logininfor</div>
}
