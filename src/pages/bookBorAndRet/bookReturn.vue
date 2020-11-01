<template>
  <div id="book-return">
    <div class="operation-box">
      <!-- <c-upload-excel
      @getExcelData="getExcelData">
      </c-upload-excel> -->
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
      <el-form :model="dialogTableData" ref="form" label-width="100px">
        <el-row>
          <el-col :span="12" >
            <el-form-item  label="图书编号" prop="isbn">
              <el-input :disabled="true" v-model="dialogTableData.isbn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="书籍名称" prop="bookName">
                <el-input :disabled="true" v-model="dialogTableData.bookName"></el-input>
              </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="书籍作者" prop="bookAuthor">
                <el-input :disabled="true" v-model.number="dialogTableData.bookAuthor"></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item label="借阅人编号" prop="userId">
              <el-input :disabled="true" v-model="dialogTableData.userId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="借阅编号" prop="borrowId ">
              <el-input :disabled="true" v-model="dialogTableData.borrowId "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="借阅人名称" prop="userName">
              <el-input :disabled="true" v-model="dialogTableData.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="借阅数量" prop="bookCnt ">
              <el-input v-model="dialogTableData.bookCnt "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="借阅时间" prop="startTime">
              <el-input :disabled="true" v-model="dialogTableData.startTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归还时间" prop="endTime">
              <el-input :disabled="true" v-model="dialogTableData.endTime"></el-input>
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
      show_dialog: false,
      tableRefs: 'multipleTable',
      dialogVisible: false,
      dialogTitle: '是否归还以下书籍',
      num: '',
      pageInfo: {
        pageSize: 3,
        currentPage: 1,
        total: 0
      },
      searchOptions: [
        {
          value: 'userName',
          label: '用户账号'
        },
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
          btnkName: 'comfirm',
          ope_name: '还书',
          func: () => {
            console.log('借阅')
            console.log(this.dialogTableData)
            if ('isbn' in this.dialogTableData) {
              this.dialogVisible = true
            } else {
              this.$message.info('请选择需要归还的图书')
              // const myDate = new Date()
              // const years = myDate.getFullYear()
              // const month = myDate.getMonth() + 1
              // const day = myDate.getDate()
              // this.dialogTableData = this.dialogTableData.map(item => {
              //   item.startDate = `${years}-${month}-${day}`
              //   item.endDate = `${years}-${month + 1}-${day}`
              //   return item
              // })
              // console.log(this.dialogTableData)
              // console.log(myDate)
            }
          }
        }
      ],
      tableHeader: [
        {
          prop: 'isbn',
          label: '书号',
          width: '100px'
        },
        {
          prop: 'bookName',
          label: '书名',
          width: '150px'
        },
        {
          prop: 'bookAuthor',
          label: '作者',
          width: '100px'
        },
        {
          prop: 'borrowId',
          label: '借阅编号'
        },
        {
          prop: 'userId',
          label: '借阅人编号',
          width: '150px'
        },
        {
          prop: 'userName',
          label: '借阅人名称'
        },
        {
          prop: 'startTime',
          label: '借阅时间',
          width: '200px'
        },
        {
          prop: 'endTime',
          label: '归还时间',
          width: '200px'
        }
      ],
      tableData: [
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '如果人生的很多事，很多的境遇，很多的人，都还如初见时的模样，那该有多好呀!若只是初见，一切美好都不会遗失。很多时候，初见，惊艳;蓦然回首，却已物是人非，沧海桑', startDate: '2020-4-29', endDate: '2020-5-29' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', startDate: '2020-4-29', endDate: '2020-5-29' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', startDate: '2020-4-29', endDate: '2020-5-29' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', startDate: '2020-4-29', endDate: '2020-5-29' }
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
      dialogTableData: {}
    }
  },
  methods: {
    getExcelData (tableHeader, tableData) {
      this.tableHeader = tableHeader
      this.tableData = tableData
    },
    async getInckBook () {
      // console.log(keyWord, inputValue)
      // const searchData = JSON.stringify({ [keyWord]: inputValue })
      // console.log(searchData)
      try {
        await this.$api.bookReturn.getReturnbook({
          pageNum: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(res => {
          console.log(res)
          if (res.data === null) {
            this.$message.info('没有在借图书')
          } else {
            this.tableData = res.data.list
            this.pageInfo.total = res.data.total
            // this.$message.success(res.msg)
          }
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    async confirmSubmit () {
      try {
        await this.$api.bookReturn.getBookInfo({
          bookCnt: this.dialogTableData.bookCnt,
          isbn: this.dialogTableData.isbn,
          borrowId: this.dialogTableData.borrowId
        }).then(res => {
          console.log(res.data)
          this.$message.success(res.msg)
          this.reload()
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
        await this.$api.bookReturn.getReturnbook({
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
    // 表格数据选中
    handleSelectionChange (row) {
      console.log(row)
      if (row.length !== 0) {
        this.dialogTableData = row[0]
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
    // 关闭弹窗
    dialogCancel () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      // this.$refs.upload.clearFiles()
    },
    dialogBeforeClose () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    dialogConfirm () {
      this.confirmSubmit()
      this.dialogVisible = false
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
@import './style/bookReturn.scss';
</style>
