import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/account/notice')({
  component: () => {
    return (
      <div className="p-2">
        <h3 className="pt-10">notice!</h3>
      </div>
    )
  }
})
