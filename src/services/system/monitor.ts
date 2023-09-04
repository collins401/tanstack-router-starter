import request from '@/utils/request'

// 查询缓存内容
export function getCache() {
  return request.get(`/monitor/cache`)
}
