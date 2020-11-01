import { post } from '../http'

const bookBorrow = {
  // 查询在库的图书
  getBook (param) {
    return post('/Api/tsgl/ListOfRkTs', param)
  },
  // 修改图书信息
  getBookInfo (param) {
    return post('/Api/borrowBook', param)
  }
}

export default bookBorrow
