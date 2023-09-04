import { FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout/account/notice').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <h3 className="pt-10">notice!</h3>
      </div>
    )
  }
})
