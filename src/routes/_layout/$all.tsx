import { FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout/$all').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <h3 className="pt-10">404!</h3>
      </div>
    )
  }
})
