<template>
  <div id="book-borrow">
    <div class="operation-box">
      <c-operation
        :tableBtnList="tableBtnList"
        :searchOptions="searchOptions"
        @keyWordSearch="keyWordSearch"
      >
      </c-operation>
    </div>
    <c-table
      ref="CtableRefs"
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
      <c-table
        class="table-box"
        :CTableData="dialogTableData"
        :showOperateBtn="false"
        :show_pagination="false"
        >
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="dialogDeleteData(scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="书号"
          prop="isBn"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          label="书籍名称"
          prop="bookName"
        >
        </el-table-column>
        <el-table-column
          label="书籍作者"
          prop="bookAuthor"
        >
        </el-table-column>
        <el-table-column
          label="书籍出版社"
          prop="bookPress"
          width="130px"
        >
        </el-table-column>
        <el-table-column
          label="内容简介"
          prop="detail"
          width="150px"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="存放地点"
          prop="bookPlace"
          width="150px"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="借阅数量"
          prop="bookCnt"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input type="number" min="0" :max="scope.row.num" v-model="scope.row.bookCnt"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="借阅时间"
          prop="startDate"
          width="110px"
        >
        </el-table-column>
        <el-table-column
          label="归还时间"
          prop="endDate"
          width="110px"
        >
        </el-table-column>
      </c-table>
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
      show_dialog: false,
      dialogVisible: false,
      dialogTitle: '是否借阅以下书籍',
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
          btnkName: 'comfirm',
          ope_name: '借阅',
          func: () => {
            console.log('借阅')
            console.log(this.dialogTableData.length)
            if (this.dialogTableData.length > 0) {
              const myDate = new Date()
              const years = myDate.getFullYear()
              const month = myDate.getMonth() + 1
              const day = myDate.getDate()
              this.dialogTableData.map(item => {
                item.startDate = `${years}-${month}-${day}`
                item.endDate = `${years}-${month + 1}-${day}`
              })
              this.dialogVisible = true
              console.log(this.dialogTableData)
            } else {
              this.$message.info('请选择需要借阅的图书')
            }
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
          prop: 'bookAuthor',
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
      dialogTableData: {}
    }
  },
  methods: {
    getExcelData (tableHeader, tableData) {
      this.tableHeader = tableHeader
      this.tableData = tableData
    },
    // 模糊搜索
    async getInckBook () {
      // console.log(keyWord, inputValue)
      // const searchData = JSON.stringify({ [keyWord]: inputValue })
      // console.log(searchData)
      try {
        await this.$api.bookBorrow.getBook({
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
    async keyWordSearch (keyWord, inputValue) {
      // console.log(keyWord, inputValue)
      // const searchData = JSON.stringify({ [keyWord]: inputValue })
      // console.log(searchData)
      try {
        await this.$api.bookBorrow.getBook({
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
    // 图书借阅
    async confirmSubmit () {
      console.log('确认提交')
      const bookCnts = this.dialogTableData.map(item => item.bookCnt).toString()
      const isbns = this.dialogTableData.map(item => item.isBn).toString()
      try {
        await this.$api.bookBorrow.getBookInfo({
          bookCnt: bookCnts,
          isbn: isbns
        }).then(res => {
          console.log(res)
          if (res.code === 10000) {
            this.$message.error('最多只能借3本')
            this.dialogTableData = []
            this.$refs.CtableRefs.$refs.elTablerefs.clearSelection()
          } else {
            this.$message.success(res.msg)
            this.reload()
          }
        })
      } catch {
        this.$refs.CtableRefs.$refs.elTablerefs.clearSelection()
        this.$message.error('数据获取失败')
      }
    },
    // 表格数据选中
    handleSelectionChange (row) {
      console.log(row)
      if (row.length !== 0) {
        this.dialogTableData = row
      }
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
    dialogDeleteData (value) {
      console.log(value)
      this.dialogTableData.splice(value, 1)
    },
    // 关闭弹窗
    dialogCancel () {
      this.dialogVisible = false
      this.dialogTableData = []
      this.$refs.CtableRefs.$refs.elTablerefs.clearSelection()
      // this.$refs.tableRefs.clearSelection()
      // this.$refs.form.resetFields()
      // this.$refs.upload.clearFiles()
    },
    dialogBeforeClose () {
      this.dialogVisible = false
      this.dialogTableData = []
      this.$refs.CtableRefs.$refs.elTablerefs.clearSelection()
      // this.$refs.tableRefs.clearSelection()
      // this.$refs.form.resetFields()
    },
    dialogConfirm (rows) {
      this.confirmSubmit()
      this.dialogVisible = false
      this.dialogTableData = []
      // this.$refs.form.resetFields()
    },
    closeDialog () {
      this.show_dialog = false
    }
  },
  mounted () {
    this.getInckBook()
  }
}
</script>

<style lang="scss">
@import './style/bookBorrow.scss';
</style>
