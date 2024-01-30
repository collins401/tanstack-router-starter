import { createFileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const Route = createFileRoute('/_layout/system/test')({
  component: PageA
})

function PageA() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return (
    <div className="p-2">
      <h1>test</h1>
    </div>
  )
}
