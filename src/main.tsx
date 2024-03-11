import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import './styles/index.css'

console.log('routeTree', routeTree)
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  history: createBrowserHistory()
})

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
