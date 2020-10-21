# book-management

## 需求：（前后端分离）
hw:
- 注册
  
- 登录
  * 2个身份，普通管理员和超级管理员
  * 登录之后判断身份
- 图书采购: `bookPurchar`
  * 管理员可以查看图书采购信息（采购编号、采购时间、采购数量、采购方式、捐赠人）
- 图书出入库：`bookInOut`
  * 管理员可以增加、删除图书（书籍编号、入库总数、出库总数、书籍存放地方）
- 图书查询: `bookSearch`
  * 用户可以查询资料室现有的图书信息（书籍编号、图书名称、图书所在书库编号、图书作者、图书采购时间）。
*** 
hs：
- 借还图书： `bookBorAndRet`
  * 管理员可以对可借阅图书进行查看、借阅和对正在借阅的图书进行归还。
- 借还图书查询: `bookBRSearch`
  * 管理员可以查询自己的已借图书信息（书籍编号、书籍名称、借阅时间，归还时间)；
  * 可以查看全部正在借阅和已经归还的图书信息（书籍编号、书籍出借人、数量、借阅时间、借书状态、归还时间）。
- 用户信息: `adminInfo`
  * 普通管理员登录后，可以修改自己的电话、用户密码等个人信息；
  * 超级管理员可以增加、删除、修改管理员，而普通管理员不行。
