import request from '@/utils/request'

interface IResponse {
  code: number
  data?: any
  rows?: any
  total?: number
  msg?: string
}

// 查询用户列表
export function listUser(params: any): Promise<IResponse> {
  return request.get('/system/user/list', { params })
}

// 查询角色列表
export function listRole(params: any): Promise<IResponse> {
  return request.get('/system/role/list', { params })
}
// 查询菜单列表
export function listMenu(params: any): Promise<IResponse> {
  return request.get('/system/menu/list', { params })
}

// 菜单删除
export function menuDel(id: number): Promise<IResponse> {
  return request.delete(`/system/menu/${id}`)
}
// 查询授权角色
export function getAuthRole(userId: string) {
  return request(`/system/user/authRole/${userId}`)
}
// // 查询用户详细
// export function getUser(userId) {
//   return request({
//     url: '/system/user/' + userId,
//     method: 'get'
//   })
// }

// // 新增用户
// export function addUser(data) {
//   return request({
//     url: '/system/user',
//     method: 'post',
//     data: data
//   })
// }

// // 修改用户
// export function updateUser(data) {
//   return request({
//     url: '/system/user',
//     method: 'put',
//     data: data
//   })
// }

// // 删除用户
// export function delUser(userId) {
//   return request({
//     url: '/system/user/' + userId,
//     method: 'delete'
//   })
// }

// // 用户密码重置
export function resetUserPwd(data: { userId: number; password: string }): Promise<IResponse> {
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data
  })
}

// // 用户状态修改
// export function changeUserStatus(userId, status) {
//   const data = {
//     userId,
//     status
//   }
//   return request({
//     url: '/system/user/changeStatus',
//     method: 'put',
//     data: data
//   })
// }

// // 查询用户个人信息
// export function getUserProfile() {
//   return request({
//     url: '/system/user/profile',
//     method: 'get'
//   })
// }

// // 修改用户个人信息
// export function updateUserProfile(data) {
//   return request({
//     url: '/system/user/profile',
//     method: 'put',
//     data: data
//   })
// }

// // 用户密码重置
// export function updateUserPwd(oldPassword, newPassword) {
//   const data = {
//     oldPassword,
//     newPassword
//   }
//   return request({
//     url: '/system/user/profile/updatePwd',
//     method: 'put',
//     params: data
//   })
// }

// // 用户头像上传
// export function uploadAvatar(data) {
//   return request({
//     url: '/system/user/profile/avatar',
//     method: 'post',
//     data: data
//   })
// }

// // 查询授权角色
// export function getAuthRole(userId) {
//   return request({
//     url: '/system/user/authRole/' + userId,
//     method: 'get'
//   })
// }

// // 保存授权角色
// export function updateAuthRole(data) {
//   return request({
//     url: '/system/user/authRole',
//     method: 'put',
//     params: data
//   })
// }

// // 查询部门下拉树结构
// export function deptTreeSelect() {
//   return request({
//     url: '/system/user/deptTree',
//     method: 'get'
//   })
// }
