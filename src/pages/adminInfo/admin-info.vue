<template>
  <div id="admin-info">
    <div class="operation-box">
      <c-operation
        :tableBtnList="tableBtnList"
        :searchOptions="searchOptions"
      >
      </c-operation>
    </div>
    <c-table
      :ref="tableRefs"
      :showSelection="true"
      :showTableOperateBtn="false"
      :CTableData="tableData"
      :pageInfo="pageInfo"
      @sizeChange="sizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <!-- show-overflow-tooltip:自动隐藏过多内容 -->
      <el-table-column
        v-for="(item,key) in tableHeader"
        :key="key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="columnFormatter"
        show-overflow-tooltip
        sortable
      ></el-table-column>
    </c-table>
    <!--确认借阅弹窗  -->
    <div class="confirm-dialog" v-show="show_dialog">
      <div class="form-box">
        <div class="title">
          <h3>{{ this.formTitle }}</h3>
        </div>
        <el-form :model="form" ref="form">
          <el-form-item
            label="用户ID"
            prop="userID"
            v-show="noShow"
          >
            <el-input :disabled="true" v-model="form.userID"></el-input>
          </el-form-item>
          <el-form-item
            label="用户账号"
            prop="userAccout"
          >
            <el-input :disabled="showDetail" v-model="form.userAccout"></el-input>
          </el-form-item>
          <el-form-item
            label="用户密码"
            prop="userPassWord"
          >
            <el-input :disabled="showDetail" v-model="form.userPassWord"></el-input>
          </el-form-item>
          <el-form-item
            label="性别"
            prop="userSex"
          >
            <el-select :disabled="showDetail" v-model="form.userSex" placeholder="请选择">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="用户名"
            prop="userName"
          >
            <el-input :disabled="showDetail" v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="userPhone"
          >
            <el-input :disabled="showDetail" v-model="form.userPhone"></el-input>
          </el-form-item>
          <el-form-item
            label="角色"
            prop="role"
          >
            <el-select :disabled="showDetail" v-model="form.role" placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btnList">
          <el-button v-show="!showDetail" type="primary" @click="confirmSubmit()">确认</el-button>
          <el-button v-show="!showDetail" type="info" @click='closeDialog()'>取消</el-button>
          <el-button v-show="showDetail" type="info" @click='closeDialog()'>关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CTable from '../../components/c-table'
// import cUploadExcel from '../../components/c-uploadExcel'
import COperation from '../../components/c-operaion'

// import { userList } from '../../api/index.js'

export default {
  components: {
    'c-table': CTable,
    // 'c-upload-excel': cUploadExcel,
    'c-operation': COperation
  },
  inject: ['reload'],
  data () {
    return {
      noShow: true,
      showDetail: false,
      show_dialog: false,
      tableRefs: 'multipleTable',
      num: '',
      formTitle: '',
      selectedRow: [],
      form: {},
      pageInfo: {
        pageSize: 1,
        currentPage: 1,
        total: 0
      },
      searchOptions: [
        {
          value: '选项1',
          label: '书籍名称'
        },
        {
          value: '选项2',
          label: '作者'
        },
        {
          value: '选项3',
          label: '出版社'
        }
      ],
      tableBtnList: [
        {
          type: 'primary',
          ope_name: '查看详情',
          func: () => {
            console.log('查看详情')
            if (this.selectedRow.length === 1) {
              this.formTitle = '查看详情'
              this.getUserData()
              this.showDetail = true
              this.show_dialog = true
            } else if (this.selectedRow.length === 0) {
              this.$message.info('请选择一条数据')
            } else {
              this.$message.info('只能选择一条数据')
            }
          }
        },
        {
          type: 'primary',
          ope_name: '新增',
          func: () => {
            console.log('新增')
            this.formTitle = '新增'
            this.show_dialog = true
            this.noShow = false
          }
        },
        {
          type: 'primary',
          ope_name: '修改',
          func: () => {
            console.log('修改')
            if (this.selectedRow.length === 1) {
              this.formTitle = '修改'
              this.getUserData()
              this.show_dialog = true
            } else if (this.selectedRow.length === 0) {
              this.$message.info('请选择一条数据')
            } else {
              this.$message.info('只能选择一条数据')
            }
          }
        },
        {
          type: 'primary',
          ope_name: '删除',
          func: () => {
            console.log('删除')
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteUser()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        },
        {
          type: 'primary',
          ope_name: '清除查询条件',
          func: () => {
            this.reload()
            // this.getInckBook()
          }
        }
      ],
      genderOptions: [
        { label: '男', value: '0' },
        { label: '女', value: '1' }
      ],
      roleOptions: [
        { label: '管理员', value: '1' },
        { label: '用户', value: '2' }
      ],
      tableHeader: [
        {
          prop: 'userID',
          label: '用户ID'
        },
        {
          prop: 'userAccout',
          label: '用户账号',
          width: '200px'
        },
        {
          prop: 'userSex',
          label: '性别',
          disName: 'genderOptions',
          width: '150px'
        },
        {
          prop: 'userName',
          label: '用户名',
          width: '200px'
        },
        {
          prop: 'userPhone',
          label: '手机号',
          width: '200px'
        },
        {
          prop: 'role',
          label: '角色',
          disName: 'roleOptions',
          width: '200px'
        }
      ],
      tableData: [
        // { userID: '1', userAccout: 'kobe', userName: 'xxx', userPhone: '18312346879', userSex: '男' },
        // { userID: '2', userAccout: 'user1', userName: 'xgxx', userPhone: '18312346879', userSex: '女' },
        // { userID: '3', userAccout: 'user2', userName: 'xxhsx', userPhone: '18312346879', userSex: '男' }
      ],
      dialogTableHeader: [
        {
          prop: 'id',
          label: '编号',
          width: '100px'
        },
        {
          prop: 'bookName',
          label: '书名',
          width: '100px'
        },
        {
          prop: 'author',
          label: '作者',
          width: '100px'
        },
        {
          prop: 'startDate',
          label: '借阅时间',
          width: '150px'
        },
        {
          prop: 'endDate',
          label: '归还时间',
          width: '150px'
        }
      ],
      dialogTableData: [
        // { id: 1, name: 'pgjaijg', startdate: '2020-04-05', enddate: '2020-05-05' },
        // { id: 1, name: 'pgjaijg', startdate: '2020-04-05', enddate: '2020-05-05' },
        // { id: 1, name: 'pgjaijg', startdate: '2020-04-05', enddate: '2020-05-05' }
      ]
    }
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      try {
        await this.$api.adminInfo.userList({
          pageNum: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(res => {
          // console.log(res)
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 获取用户详情
    async getUserData () {
      try {
        await this.$api.adminInfo.getUserDetail({
          user_id: this.selectedRow[0].userID
        }).then(res => {
          console.log(res)
          this.form = res.data
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 修改用户信息
    async changeUser () {
      console.log('change')
      try {
        await this.$api.adminInfo.changeUser({
          ...this.form
        }).then(res => {
          console.log(res)
          // this.form = res.data
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 新增用户
    async addUser () {
      console.log(this.form)
      try {
        await this.$api.adminInfo.addUserData({
          ...this.form
        }).then(res => {
          console.log(res)
          // this.form = res.data
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 删除用户
    async deleteUser () {
      try {
        await this.$api.adminInfo.deleteUser({
          user_id: this.selectedRow[0].userID
        }).then(res => {
          console.log(res)
          this.reload()
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 模糊搜索
    async keyWordSearch (keyWord, inputValue) {
      try {
        await this.$api.bookSearch.getInck({
          [keyWord]: inputValue,
          pageNum: 1,
          pageSize: this.pageInfo.pageSize
        }).then(res => {
          console.log(res)
          console.log(res.data)
          if (res.data === null) {
            this.pageInfo.total = 0
            this.tableData = []
            this.$message.info(res.msg)
          } else {
            this.tableData = res.data.list
            this.pageInfo.total = res.data.total
            this.$message.success(res.msg)
          }
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    confirmSubmit () {
      console.log('确认提交')
      if (this.formTitle === '修改') {
        this.changeUser()
      } else if (this.formTitle === '新增') {
        this.addUser()
      }
      this.show_dialog = false
      this.reload()
    },
    sizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getUserList()
    },
    handleCurrentChange (pageNum) {
      this.pageInfo.currentPage = pageNum
      this.getUserList()
    },
    // 表格数据选中
    handleSelectionChange (row) {
      // console.log(row)
      this.selectedRow = row
      console.log(this.selectedRow)
    },
    // 关闭弹窗
    closeDialog () {
      this.show_dialog = false
      this.showDetail = false
      this.$refs.form.resetFields()
    },
    columnFormatter (row, column, cellValue, index) {
      const disName = this.tableHeader.filter(item => {
        return item.prop === column.property
      })[0].disName
      if (disName) {
        return this[disName].filter(item => {
          return item.value === row[column.property]
        })[0].label
      } else {
        return row[column.property]
      }
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>

<style lang="scss">
@import './style/admin-info.scss';
</style>
