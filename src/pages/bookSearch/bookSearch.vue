<template>
  <div id="book-search">
    <div class="operation-box">
      <c-operation
        :tableBtnList="tableBtnList"
        :searchOptions="searchOptions"
        @keyWordSearch="keyWordSearch"
      >
      </c-operation>
    </div>
    <c-table
      :ref="tableRefs"
      :showSelection="true"
      :showTableOperateBtn="true"
      :CTableData="tableData"
      :pageInfo="pageInfo"
      @sizeChange="sizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @editData="beforeEditBookInfo"
    >
      <!-- show-overflow-tooltip:自动隐藏过多内容 -->
      <el-table-column
        v-for="(item,key) in tableHeader"
        :key="key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        show-overflow-tooltip
      ></el-table-column>
    </c-table>
     <!--确认借阅弹窗  -->
    <c-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      @dialog-before-close="dialogBeforeClose"
      @dialog-cancel="dialogCancel"
      @dialog-confirm="dialogConfirm">
      <el-form :model="dialogTableData" ref="form" label-width="100px">
        <el-row>
          <el-col :span="12" >
            <el-form-item v-show="false" label="书籍编号" prop="id">
              <el-input v-model="dialogTableData.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="书籍名称" prop="bookName">
                <el-input :disabled="true" v-model="dialogTableData.bookName"></el-input>
              </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="书籍作者" prop="bookAuthor">
                <el-input v-model.number="dialogTableData.bookAuthor"></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item label="书籍出版社" prop="bookPress">
              <el-input v-model="dialogTableData.bookPress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容简介" prop="detail">
              <el-input v-model="dialogTableData.detail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地点" prop="bookPlace">
              <el-input v-model="dialogTableData.bookPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书籍库存量" prop="num">
              <el-input v-model="dialogTableData.num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价" prop="price">
              <el-input v-model="dialogTableData.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </c-dialog>
  </div>
</template>

<script>
import CTable from '../../components/c-table'
// import cUploadExcel from '../../components/c-uploadExcel'
import COperation from '../../components/c-operaion'
import CDialog from '../../components/c-dialog'

export default {
  components: {
    'c-table': CTable,
    // 'c-upload-excel': cUploadExcel,
    'c-operation': COperation,
    'c-dialog': CDialog
  },
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      dialogTitle: '修改书籍信息',
      tableRefs: 'multipleTable',
      num: '',
      pageInfo: {
        pageSize: 3,
        currentPage: 1,
        total: 0
      },
      searchOptions: [
        {
          value: 'bookName',
          label: '书籍名称'
        },
        {
          value: 'bookAuthor',
          label: '作者'
        },
        {
          value: 'bookPress',
          label: '出版社'
        }
      ],
      tableBtnList: [
        {
          type: 'primary',
          ope_name: '清除查询条件',
          func: () => {
            this.reload()
            // this.getInckBook()
          }
        }
      ],
      tableHeader: [
        {
          prop: 'id',
          label: '编号',
          width: '150px'
        },
        {
          prop: 'bookName',
          label: '书名',
          width: '150px'
        },
        {
          prop: 'bookAuthor',
          label: '作者',
          width: '150px'
        },
        {
          prop: 'bookPress',
          label: '书籍出版社',
          width: '200px'
        },
        {
          prop: 'detail',
          label: '内容简介',
          width: '450px'
        },
        {
          prop: 'num',
          label: '在库数量'
        },
        {
          prop: 'price',
          label: '单价'
        }
      ],
      tableData: [
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '如果人生的很多事，很多的境遇，很多的人，都还如初见时的模样，那该有多好呀!若只是初见，一切美好都不会遗失。很多时候，初见，惊艳;蓦然回首，却已物是人非，沧海桑', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', allCounts: '105' }
      ],
      // dialogTableHeader: [
      //   {
      //     prop: 'id',
      //     label: '编号',
      //     width: '100px'
      //   },
      //   {
      //     prop: 'bookName',
      //     label: '书名',
      //     width: '100px'
      //   },
      //   {
      //     prop: 'author',
      //     label: '作者',
      //     width: '100px'
      //   },
      //   {
      //     prop: 'startDate',
      //     label: '借阅时间',
      //     width: '150px'
      //   },
      //   {
      //     prop: 'endDate',
      //     label: '归还时间',
      //     width: '150px'
      //   }
      // ],
      dialogTableData: {},
      formRules: {
        id: [{ required: true, message: '请填写用户账号', trigger: 'change' }],
        bookName: [{ required: true, message: '请填写用户名', trigger: 'change' }],
        author: [{ required: true, message: '请选择你的性别', trigger: 'change' }],
        chubanshe: [{ required: true, message: '请填写手机号', trigger: 'change' }],
        buyCounts: [{ required: true, message: '请填写用户邮箱', trigger: 'change' }],
        allCounts: [{ required: true, message: '请填写身份证', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 查询已入库的图书
    async getInckBook () {
      try {
        await this.$api.bookSearch.getInck({
          pageNum: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(res => {
          console.log(res)
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 编辑图书信息
    beforeEditBookInfo (row) {
      console.log(row)
      this.dialogTitle = '编辑图书'
      this.dialogTableData = this.tableData[row]
      this.dialogVisible = true
    },
    dialogConfirm () {
      this.editBookInfo()
      this.dialogVisible = false
      // this.$refs.form.resetFields()
    },
    async editBookInfo () {
      console.log(this.dialogTableData)
      try {
        await this.$api.bookSearch.editBookInfo({
          ...this.dialogTableData
        }).then(res => {
          console.log(res)
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 模糊搜索
    async keyWordSearch (keyWord, inputValue) {
      // console.log(keyWord, inputValue)
      // const searchData = JSON.stringify({ [keyWord]: inputValue })
      // console.log(searchData)
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
    getExcelData (tableHeader, tableData) {
      this.tableHeader = tableHeader
      this.tableData = tableData
    },
    confirmSubmit () {
      console.log('确认提交')
    },
    // 表格数据选中
    handleSelectionChange (row) {
      console.log(row)
      this.dialogTableData = row
    },
    sizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getInckBook()
    },
    handleCurrentChange (pageNum) {
      this.pageInfo.currentPage = pageNum
      this.getInckBook()
    },
    // 关闭弹窗
    dialogCancel () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      // this.$refs.upload.clearFiles()
    },
    dialogBeforeClose () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  },
  mounted () {
    this.getInckBook()
  }
}
</script>

<style lang="scss">
@import './style/bookSearch.scss';
</style>
