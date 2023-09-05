import { FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout/system/menu').createRoute({
  component: MenuPage
})
function MenuPage() {
  return <div className="p-2">menu</div>
}
