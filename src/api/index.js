import { get, post } from '../http'

// 登录
const login = param => post('/Api/login', param)
// 退出
const logout = param => get('/Api/out', param)
// 获取验证码
const getImage = () => get('/Api/getImage')
// 注册
const register = param => post('/Api/register', param)
// 获取用户信息列表
const userList = param => post('/Api/ListUsers', param)
// 获取用户信息详情
const getUserDetail = param => post('/Api/getUserDetail', param)
// 修改用户
const changeUser = param => post('/Api/updateUser', param)
// 新增用户
const addUserData = param => post('/Api/saveUser', param)
// 删除用户
const deleteUser = param => post('/Api/deleteUser', param)

export default {
  login,
  logout,
  getImage,
  register,
  userList,
  getUserDetail,
  changeUser,
  addUserData,
  deleteUser
}
