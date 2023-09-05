import { FileRoute } from '@tanstack/react-router'
import { Button } from 'antd'
import ERROR from '@/assets/images/404.png'

export const route = new FileRoute('/_layout/$all/$all').createRoute({
  component: () => {
    return (
      <div className="p-5 min-h-[calc(100vh-115px)]">
        <div className="flex-between max-w-650px mx-auto pt-10">
          <div className="pt-10">
            <h2 className="text-primary text-3xl mb-7 font-500 ">Page Not found</h2>
            <p className="text-color/60">很抱歉， 你要查看的页面不存在！</p>
            <Button type="primary">返回</Button>
          </div>
          <div className="hidden flex-1 lg:text-right md:flex">
            <img src={ERROR} alt="404" className="w-400px" />
          </div>
        </div>
      </div>
    )
  }
})
