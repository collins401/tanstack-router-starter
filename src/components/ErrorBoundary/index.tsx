import React from 'react'
import { Button } from 'antd'
import Catch from './boundary'
import SYSTEM from '@/assets/images/500.png'

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
const systemUpdateFlag = 'Failed to fetch dynamically'
const ErrorBoundary = Catch((props: Props, error?: Error) => {
  if (error) {
    return (
      <div className="update-block -mt-25px z-100 relative bg-[#f5f5f5]">
        <div className="items-center pt-20 mx-auto text-center max-w-650px lg:flex">
          {error.message.includes(systemUpdateFlag) ? (
            <div className="mb-5 lg:text-left">
              <h2 className="my-5 text-2xl text-primary">系统更新了</h2>
              <p className="mb-0 text-color/60">很抱歉，中断了您当前的操作！</p>
              <p className="text-color/60">为了更好的使用系统新功能，请手动刷新页面</p>
              <Button
                type="primary"
                onClick={() => {
                  sessionStorage.clear()
                  localStorage.clear()
                  location.reload()
                }}
              >
                立即更新
              </Button>
            </div>
          ) : (
            <div className="mb-5 lg:text-left flex-1">
              <h2 className="my-5 text-2xl text-primary">页面出错了</h2>
              <p className="mb-0 text-color/60 mb-4">
                很抱歉，中断了您当前的操作, 你可以 <br />
                <a
                  className="hover:!underline"
                  onClick={() => window.location.replace(document.referrer)}
                >
                  返回上一页
                </a>
                <span className="mx-1">或</span>
                <a className="hover:!underline" onClick={() => location.reload()}>
                  刷新当前页
                </a>
              </p>
              <p className="bg-danger/10 py-2 px-4 rounded text-16px">
                <div className="text-12px text-color/30">错误信息</div>
                {error.message}
              </p>
            </div>
          )}
          <div className="flex-1 lg:text-right">
            <img src={SYSTEM} alt="system" />
          </div>
        </div>
      </div>
    )
  }
  return <>{props.children}</>
})

export default ErrorBoundary
