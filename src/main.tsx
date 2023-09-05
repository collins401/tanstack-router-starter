import ReactDOM from 'react-dom/client'
import { Router, RouterProvider, createBrowserHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import './styles/index.css'

console.log('routeTree', routeTree)
const router = new Router({
  routeTree,
  defaultPreload: 'intent',
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
