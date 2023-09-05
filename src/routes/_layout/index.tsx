import { FileRoute } from '@tanstack/react-router'
import { Badge, Button, Calendar, Progress } from 'antd'
import { AlertOutlined, FallOutlined, RiseOutlined, StrikethroughOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { SvgIcon } from '@/components'

const icons = [
  { icon: 'vite', title: 'Vite', desc: 'Bundling & hot reloading', color: 'bg-[#646cff]/40' },
  { icon: 'ts', title: 'Typescript', desc: 'Types and auto-discovery', color: 'bg-[#3b82f6]/40' },
  { icon: 'pnpm', title: 'pnpm', desc: 'Package management, fast', color: 'bg-[#f97316]/40' },
  { icon: 'uno', title: 'uno css', desc: 'Utility-based styles', color: 'bg-[#1890ff]/40' },
  {
    icon: 'ant',
    title: 'ant design',
    desc: 'high quality UI components',
    color: 'bg-[#1677ff]/40'
  },
  {
    icon: 'zustand',
    title: 'zustand',
    desc: 'a small, state-management ',
    color: 'bg-[#0cc2aa]/40'
  },
  { icon: 'eslint', title: 'eslint', desc: 'Standardized code output', color: 'bg-[#3b82f6]/40' },
  { icon: 'prettier', title: 'prettier', desc: 'Code beautification', color: 'bg-[#eab308]/50' }
]

export const route = new FileRoute('/_layout/').createRoute({
  component: () => {
    return (
      <div className="p-2">
        <div className="grid  xs:grid-cols-2 md:grid-cols-3 md:grid-rows-2 md:grid-flow-col gap-5">
          <div className="bg-white rounded-md p-5">
            <div>
              <Button type="primary" icon={<StrikethroughOutlined />} />
              <span className="text-lg font-500 ml-2 text-color/60">今日收入</span>
            </div>
            <div className="text-3xl m-5-0-2 font-600">
              <span className="text-lg text-color/60">￥</span>9812.09
            </div>
            <div className="flex-between">
              <span className="text-red-500">
                12.89% <RiseOutlined className="text-red-500" />
              </span>
              <div className="w-100px">
                <Progress percent={80} size="small" status="active" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md p-5">
            <div>
              <Button type="primary" danger icon={<AlertOutlined />} />
              <span className="text-lg font-500 ml-2 text-color/60">流失客户</span>
            </div>
            <div className="text-3xl m-5-0-2 font-600 text-color/60">812</div>
            <div className="flex-between">
              <span className="text-green-500">
                0.22% <FallOutlined className="text-green-500" />
              </span>
              <div className="w-100px">
                <Progress percent={100} size="small" status="exception" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md row-span-2">
            <div className="bg-indigo-500 rounded-t-md p-5">
              <Badge dot>
                <h3 className="text-lg m-0 font-500 text-white">我的待办</h3>
              </Badge>
            </div>
            <Calendar
              value={dayjs('2023-04-07')}
              validRange={[dayjs('2023-01-01'), dayjs('2023-12-31')]}
              fullscreen={false}
            />
          </div>
          <div className="bg-gradient-to-b from-[#e1a769] to-[#da7f79] rounded-md row-span-2 p-4 text-white">
            <h3 className="text-lg font-500">疑问或解答</h3>
            <p className="text-sm my-3">成为朋友，可以沟通聊一聊</p>
          </div>
        </div>
        <h4 className="m-4-0-1 text-color/60">Feature in this</h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {icons?.map((item, index) => (
            <div key={item.icon} className="flex border rounded-xl bg-white p-4">
              <div className={`rounded-lg ${item.color} p-4`}>
                <SvgIcon size="28px" type={item.icon} />
              </div>
              <div className="flex-1 ml-3">
                <h4 className="text-lg mb-1 capitalize">{item.title}</h4>
                <p className="text-color/60 capitalize">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
