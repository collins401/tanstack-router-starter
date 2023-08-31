import { FileRoute, useNavigate } from '@tanstack/react-router'
import { Avatar, Button, Form, Input } from 'antd'
import { useCookieState, useRequest } from 'ahooks'
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/constants'
import { getCodeImg, login } from '@/services/api'

export const route = new FileRoute('/login').createRoute({
  component: Login
})

export function Login() {
  const [_, setToken] = useCookieState(TOKEN_KEY)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { data: captcha, refresh: refreshImg } = useRequest(async () => {
    const res = await getCodeImg()
    if (res.code === 200) {
      res.avatar = `data:image/gif;base64,${res.img}`
    }
    return res
  })
  async function submit(v) {
    const params = {
      ...v,
      uuid: captcha.uuid
    }
    setLoading(true)
    login(params)
      .then(res => {
        if (res.code === 200) {
          Cookies.set(TOKEN_KEY, res.token)
          setTimeout(() => {
            window.location.href = '/'
          }, 200)
        }
      })
      .finally(() => {
        setLoading(false)
        form.setFieldsValue({ code: '' })
      })
      .catch(e => {
        refreshImg()
      })
  }
  return (
    <div className="p-0 flex h-[100vh]">
      <div className="hidden md:flex w-[38.2%] bg-primary justify-between text-white p-10 flex-col">
        <h1 className="text-[30px] pt-10">RuoYi</h1>
        <div className="mt-20 flex-1">
          <h2 className="text-[36px]">基于SpringBoot的权限管理系统 易读易懂、界面简洁美观</h2>
          <p className="text-white/60 text-lg">
            提供多终端适配：电脑、平板、手机等所有主流设备，提供多种不同风格的皮肤。页面美观，高端大气上档次。{' '}
            <br />
            内置完整的权限架构，包括：菜单、角色、用户、字典、参数、监控、代码生成等一系列系统常规模块。
          </p>
        </div>
        <div className="mb-20 ">
          <div className="bg-dark/40 rounded-2xl p-6 text-lg text-white/80">
            <p>
              力求简洁的 React 后台管理框架，基于 Antd 5.0 + Vite 4.3
              ，提供了一套完整的解决方案，让你专注于业务。
            </p>
            <div className="flex">
              <Avatar size={60} shape="square">
                RY
              </Avatar>
              <div className="ml-2">
                <h4 className="m-0">RuoYi</h4>
                <span className="text-sm">开发者</span>
              </div>
            </div>
          </div>
          <div className="text-center pt-4 space-x-2">
            <span className="size-8px rounded-full bg-white inline-block"></span>
            <span className="size-8px rounded-full bg-white/30 inline-block"></span>
            <span className="size-8px rounded-full bg-white/30 inline-block"></span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-[320px] rounded-md mx-auto  ">
          <h2 className="mb-5">用户登录</h2>
          <Form
            form={form}
            size="large"
            onFinish={submit}
            autoComplete="off"
            requiredMark={false}
            initialValues={{ username: 'admin', password: 'admin123' }}
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入您的账号' }]}>
              <Input placeholder="用户名" prefix={<UserOutlined className="text-dark/40" />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入您的密码' }]}>
              <Input.Password
                placeholder="密码"
                prefix={<LockOutlined className="text-dark/40" />}
              />
            </Form.Item>
            <Form.Item>
              <div className="flex items-center space-x-4">
                <Form.Item
                  name="code"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input
                    className="!flex-1"
                    placeholder="验证码"
                    prefix={<SafetyCertificateOutlined className="text-dark/40" />}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  <img
                    src={captcha?.avatar}
                    onClick={refreshImg}
                    alt="code"
                    height={40}
                    width={106}
                  />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
