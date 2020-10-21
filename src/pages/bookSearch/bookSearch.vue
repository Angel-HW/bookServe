<template>
  <div id="book-search">
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
    <c-dialog v-model="dialogVisible"
      :title="dialogTitle"
      @dialog-before-close="dialogBeforeClose"
      @dialog-cancel="dialogCancel"
      @dialog-confirm="dialogConfirm">
        <el-form :model="dialogTableData" ref="form" :rules="formRules" label-width="100px">
          <el-row>
            <el-col :span="12" >
              <el-form-item label="书籍编号" prop="id">
                <el-input v-model="dialogTableData.id"></el-input>
              </el-form-item>
            </el-col>
        <el-col :span="12">
            <el-form-item label="书籍名称" prop="bookName">
              <el-input v-model="dialogTableData.bookName"></el-input>
            </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item label="书籍作者" prop="author">
              <el-input v-model.number="dialogTableData.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书籍出版社" prop="chubanshe">
              <el-input v-model="dialogTableData.chubanshe"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容简介" prop="buyCounts">
              <el-input v-model="dialogTableData.buyCounts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书籍库存量" prop="allCounts">
              <el-input v-model="dialogTableData.allCounts"></el-input>
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
  data () {
    return {
      dialogVisible: false,
      dialogTitle: '修改书籍信息',
      tableRefs: 'multipleTable',
      num: '',
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
          btnkName: 'comfirm',
          ope_name: '修改',
          func: () => {
            console.log('修改')
            console.log(this.dialogTableData)
            this.dialogVisible = true
            // if (this.dialogTableData.length === 0) {
            //   this.$message.info('请选择需要修改的图书')
            // } else {
            //   const myDate = new Date()
            //   const years = myDate.getFullYear()
            //   const month = myDate.getMonth() + 1
            //   const day = myDate.getDate()
            //   this.dialogTableData = this.dialogTableData.map(item => {
            //     item.startDate = `${years}-${month}-${day}`
            //     item.endDate = `${years}-${month + 1}-${day}`
            //     return item
            //   })
            //   console.log(this.dialogTableData)
            //   console.log(myDate)
            //   this.dialogVisible = true
            // }
          }
        }
      ],
      tableHeader: [
        {
          prop: 'id',
          label: '编号',
          width: '100px'
        },
        {
          prop: 'bookName',
          label: '书名',
          width: '150px'
        },
        {
          prop: 'author',
          label: '作者',
          width: '100px'
        },
        {
          prop: 'chubanshe',
          label: '书籍出版社',
          width: '200px'
        },
        {
          prop: 'buyCounts',
          label: '内容简介'
        },
        {
          prop: 'allCounts',
          label: '在库数量',
          width: '200px'
        }
      ],
      tableData: [
        { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '如果人生的很多事，很多的境遇，很多的人，都还如初见时的模样，那该有多好呀!若只是初见，一切美好都不会遗失。很多时候，初见，惊艳;蓦然回首，却已物是人非，沧海桑', allCounts: '105' },
        { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', allCounts: '105' },
        { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', allCounts: '105' },
        { id: '1', bookName: '平凡的世界', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', allCounts: '105' }
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
    // 关闭弹窗
    dialogCancel () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      // this.$refs.upload.clearFiles()
    },
    dialogConfirm () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    dialogBeforeClose () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss">
@import './style/bookSearch.scss';
</style>
