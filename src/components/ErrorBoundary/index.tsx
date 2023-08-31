import React from 'react'
import Catch from './boundary'

// import { Button } from 'antd-mobile';
/**
 * 包裹组件，在渲染错误的时候显示
 * <ErrorBoundary>
 *    <RError />
 * </ErrorBoundary>
 */
interface Props {
  children: React.ReactNode
}

const ErrorBoundary = Catch((props: Props, error?: Error) => {
  if (error) {
    return (
      <div className="p-4 bg-white" style={{ border: '1px solid #ddd' }}>
        <h2 className="text-red-500">页面错误或数据渲染问题</h2>
        <h4 className="">报错信息：{error.message}</h4>
        {/* todo 不提供刷新页面功能，可能当前错误是中间页面，需要增加一个时光机回溯 */}
        {/* <Button>刷新页面</Button> */}
      </div>
    )
  }
  return <>{props.children}</>
})

export default ErrorBoundary
