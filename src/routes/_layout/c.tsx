import { FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout/c').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <h1>BBB-BBB</h1>
      </div>
    )
  }
})
