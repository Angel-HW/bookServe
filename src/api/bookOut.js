import { post } from '../http'

const bookOut = {
  // 查询已入库的图书
  getInck (param) {
    return post('/Api/tsgl/ListOfRkTs', param)
  },
  // 图书出库
  deleteBook (param) {
    return post('/Api/tsgl/deleteTsFromCk', param)
  }
}

export default bookOut
