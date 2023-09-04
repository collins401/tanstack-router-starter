import { FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout/account/').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <h3 className="pt-10">accout!</h3>
      </div>
    )
  }
})
