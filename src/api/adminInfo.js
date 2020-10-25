import { get, post } from '../http'

const adminInfo = {
  // 登录
  login (param) {
    return post('/Api/login', param)
  },
  // 退出
  logout (param) {
    return get('/Api/out', param)
  },
  // 获取验证码
  getImage () {
    return get('/Api/getImage')
  },
  // 注册
  register (param) {
    return post('/Api/register', param)
  },
  // 获取用户信息列表
  userList (param) {
    return post('/Api/ListUsers', param)
  },
  // 获取用户信息详情
  getUserDetail (param) {
    return post('/Api/getUserDetail', param)
  },
  // 修改用户
  changeUser (param) {
    return post('/Api/updateUser', param)
  },
  // 新增用户
  addUserData (param) {
    return post('/Api/saveUser', param)
  },
  // 删除用户
  deleteUser (param) {
    return post('/Api/deleteUser', param)
  }
}

export default adminInfo
