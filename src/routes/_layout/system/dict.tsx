import { createFileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const Route = createFileRoute('/_layout/system/dict')({
  component: DictPage
})

function DictPage() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return (
    <div className="p-2">
      <h1>aaa-dict</h1>
      <h1>aaa-dict</h1>
      <h1>aaa-dict</h1>
      <h1>aaa-dict</h1>
    </div>
  )
}
