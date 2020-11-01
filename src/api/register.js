import { post } from '../http'

const register = {
  register (param) {
    return post('/Api/register', param)
  }
}
export default register
