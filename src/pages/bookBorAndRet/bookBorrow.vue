<template>
  <div id="book-borrow">
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
     <div class="confirm-dialog" v-show="show_dialog">
       <div class="table-box">
         <div class="title">
           <h3>是否借阅以下书籍</h3>
         </div>
        <c-table
          :show_pagination="false"
          :CTableData="dialogTableData"
        >
          <el-table-column
            v-for="(item,key) in dialogTableHeader"
            :key="key"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            show-overflow-tooltip
          ></el-table-column>
        </c-table>
        <div class="btnList">
          <el-button type="primary" @click="confirmSubmit()">确认</el-button>
          <el-button type="info" @click='closeDialog()'>取消</el-button>
        </div>
       </div>
     </div>
  </div>
</template>

<script>
import CTable from '../../components/c-table'
// import cUploadExcel from '../../components/c-uploadExcel'
import COperation from '../../components/c-operaion'

export default {
  components: {
    'c-table': CTable,
    // 'c-upload-excel': cUploadExcel,
    'c-operation': COperation
  },
  data () {
    return {
      show_dialog: false,
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
          ope_name: '借阅',
          func: () => {
            console.log('借阅')
            console.log(this.dialogTableData)
            if (this.dialogTableData.length === 0) {
              this.$message.info('请选择需要借阅的图书')
            } else {
              const myDate = new Date()
              const years = myDate.getFullYear()
              const month = myDate.getMonth() + 1
              const day = myDate.getDate()
              this.dialogTableData = this.dialogTableData.map(item => {
                item.startDate = `${years}-${month}-${day}`
                item.endDate = `${years}-${month + 1}-${day}`
                return item
              })
              console.log(this.dialogTableData)
              console.log(myDate)
              this.show_dialog = true
            }
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
    closeDialog () {
      this.show_dialog = false
    }
  }
}
</script>

<style lang="scss">
@import './style/bookBorrow.scss';
</style>
