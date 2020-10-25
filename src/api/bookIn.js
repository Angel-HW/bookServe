import { post } from '../http'

const bookIn = {
  // 查询未入库图书
  getNoInck (param) {
    return post('/Api/tsgl/ListOfTs', param)
  },
  // 图书入库
  addck (param) {
    return post('/Api/tsgl/addCk', param)
  },
  // 图书入库删除
  deleteck (param) {
    return post('/Api/tsgl/deleteTsFromCg', param)
  }
}

export default bookIn
