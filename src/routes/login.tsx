import { FileRoute, useNavigate } from '@tanstack/react-router'
import { Button, Carousel, ConfigProvider, Form, Input } from 'antd'
import { useCookieState, useRequest } from 'ahooks'
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/constants'
import { getCodeImg, login } from '@/services/api'
import IMG from '@/assets/images/1.svg'

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
      form.setFieldValue('code', '')
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
      <div className="hidden md:flex w-[45.2%] bg-primary flex-center text-white p-10">
        <div className="text-center">
          <img className="max-w-500px" src={IMG} />
          <div className="relative m-10 w-500px">
            <Carousel effect="fade">
              <div>
                <div className="bg-dark/40 rounded-2xl p-6 text-lg text-white/80">
                  <p>
                    基于antd5.0 + Vite 4.4开发，力求简洁的 React
                    后台管理框架，提供了一套完整的解决方案，让你专注于业务。
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-dark/40 rounded-2xl p-6 text-lg text-white/80">
                  <p>
                    基于TanStack Router
                    的文件式路由管理+完善的权限管理，让你专注于开发，不再为繁琐的路由配置而烦恼
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-dark/40 rounded-2xl p-6 text-lg text-white/80">
                  <p>
                    严谨的Eslint+prettier+commitLint配置项，让你的代码更加规范，让你的项目更加优雅，让你的团队更加专业，
                  </p>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-[320px] rounded-md mx-auto  ">
          <h2 className="mb-5">用户登录</h2>
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 0
              }
            }}
          >
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
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}
