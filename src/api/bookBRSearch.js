import { post } from '../http'

const bookBRSearch = {
  // 查询借阅的图书
  getReturnbook (param) {
    return post('/Api/listBorrow', param)
  },
  // 修改图书信息
  getBookInfo (param) {
    return post('/Api/returnBook', param)
  }
}

export default bookBRSearch
