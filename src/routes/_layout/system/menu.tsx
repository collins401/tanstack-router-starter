import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/system/menu')({
  component: MenuPage
})
function MenuPage() {
  return <div className="p-2">menu</div>
}
