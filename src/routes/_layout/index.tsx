import { FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout/').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <h1>index Page</h1>
      </div>
    )
  }
})
