import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/constants/index'

const errorMessage: any = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员'
}

const service = axios.create({
  baseURL: '/prod-api/',
  timeout: 12000
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // config
    config.headers = {
      Authorization: `Bearer ${Cookies.get(TOKEN_KEY)}`
      // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjBmZTEwYTMzLTM4MjYtNDRjNS1hNWQzLWZlNGIxYThjMzg0NyJ9.Pdb6NkfygHqXq0-kP-JnO8M7a_pmednl_KtRBbmiUITzTC3FrfAmDndFLO-gP9jBxrkQZTpl3oLwYCmphQYDQg`
    }
    return config
  },
  (error: AxiosError) => Promise.resolve(error || '服务器异常')
)

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorMessage[code] || res.data.msg || errorMessage.default
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      location.href = '/login'
      return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
    }
    if (code === 500) {
      toast.error(msg)
      return Promise.reject(new Error(msg))
    }
    if (code === 601) {
      toast.error(msg)
      return Promise.reject(new Error(msg))
    }
    // if (code === 401) {
    //   window.location.href = '/login'
    // } else if (code !== 200) {
    //   toast.error(msg)
    //   // message.warning(msg)
    //   return Promise.reject(new Error(msg))
    // }
    return res.data
  },
  (error: AxiosError) => {
    const { response } = error
    if (response?.status) {
      const { status, statusText } = response
      const errorText = errorMessage[status] || statusText
      toast.message('请求错误', {
        description: errorText
      })
    }
    return Promise.reject(error)
  }
)

export default service
