import { post } from '../http'

const bookPurchar = {
  // 采购
  addcg (param) {
    return post('/Api/tsgl/addTs', param)
  }
}

export default bookPurchar
