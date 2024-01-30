import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/account/')({
  component: () => {
    return (
      <div className="p-2">
        <h3 className="pt-10">accout!</h3>
      </div>
    )
  }
})
