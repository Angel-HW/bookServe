import { get, post } from '../http'

const login = {
  getImage () {
    return get('/Api/getImage')
  },
  login (param) {
    return post('/Api/login', param)
  }
}
export default login
