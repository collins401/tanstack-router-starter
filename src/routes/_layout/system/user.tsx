import { FileRoute } from '@tanstack/react-router'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/system/user').createRoute({
  component: PageA
})

function PageA() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return (
    <div className="p-2">
      <h1>aaa-AAA</h1>
      <h1>aaa-AAA</h1>
      <h1>aaa-AAA</h1>
      <h1>aaa-AAA</h1>
    </div>
  )
}
