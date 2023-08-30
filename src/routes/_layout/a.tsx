import { FileRoute } from '@tanstack/react-router'
import BaseFun from './-components/base'

export const route = new FileRoute('/_layout/a').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <h1>aaa-AAA</h1>
        <BaseFun />
      </div>
    )
  }
})
