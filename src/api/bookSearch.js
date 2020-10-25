import { post } from '../http'

const bookSearch = {
  // 查询已入库的图书
  getInck (param) {
    return post('/Api/tsgl/ListOfRkTs', param)
  },
  // 修改图书信息
  editBookInfo (param) {
    return post('/Api/tsgl/updateTs', param)
  }
}

export default bookSearch
