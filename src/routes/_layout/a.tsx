import { FileRoute } from '@tanstack/react-router'
import BaseFun from './components/base'
import useAccess from '@/hooks/useAccess'

export const route = new FileRoute('/_layout/a').createRoute({
  component: PageA
})

function PageA() {
  const { hasRole } = useAccess()
  console.log(hasRole())
  return (
    <div className="p-2">
      <h1>aaa-AAA</h1>
      {hasRole() && <BaseFun />}
    </div>
  )
}
