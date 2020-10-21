<template>
  <div id="book-BR-search">
    <div class="operation-box">
      <!-- <c-upload-excel
      @getExcelData="getExcelData">
      </c-upload-excel> -->
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
        sortable
      ></el-table-column>
    </c-table>
     <!--确认借阅弹窗  -->
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
      tableBtnList: [],
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
          prop: 'startDate',
          label: '借阅时间',
          width: '200px'
        },
        {
          prop: 'endDate',
          label: '归还时间',
          width: '200px'
        }
      ],
      tableData: [
        { id: '1', bookName: '啊平凡的世界1', author: 'xxx', chubanshe: '2020-11-28', buyCounts: '如果人生的很多事，很多的境遇，很多的人，都还如初见时的模样，那该有多好呀!若只是初见，一切美好都不会遗失。很多时候，初见，惊艳;蓦然回首，却已物是人非，沧海桑', startDate: '2020-4-29', endDate: '2020-5-29' },
        { id: '2', bookName: '吧平凡的世界3', author: 'xxx', chubanshe: '2020-9-28', buyCounts: '54', startDate: '2020-11-28', endDate: '2020-12-28' },
        { id: '3', bookName: '在平凡的世界5', author: 'xxx', chubanshe: '2019-9-8', buyCounts: '54', startDate: '2019-9-8', endDate: '2020-9-8' },
        { id: '4', bookName: '和平凡的世界12', author: 'xxx', chubanshe: '2020-9-2', buyCounts: '54', startDate: '2020-4-29', endDate: '2020-5-29' }
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
@import './style/bookBRSearch.scss';
</style>
