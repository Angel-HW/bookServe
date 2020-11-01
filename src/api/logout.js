import { get } from '../http'

const logout = {
  logout () {
    return get('/Api/out')
  }
}
export default logout
