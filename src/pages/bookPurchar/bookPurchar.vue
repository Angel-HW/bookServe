<template>
  <div id="book-purchar">
    <div class="operation-box">
      <c-upload-excel
      @getExcelData="getExcelData">
      </c-upload-excel>
      <c-operation
        :tableBtnList="tableBtnList"
        :searchOptions="searchOptions"
      >
      </c-operation>
    </div>
    <c-table
      :showSelection="true"
      :showTableOperateBtn="true"
      :CTableData="tableData"
    >
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
  </div>
</template>

<script>
import CTable from '../../components/c-table'
import cUploadExcel from '../../components/c-uploadExcel'
import COperation from '../../components/c-operaion'

export default {
  components: {
    'c-table': CTable,
    'c-upload-excel': cUploadExcel,
    'c-operation': COperation
  },
  data () {
    return {
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
          ope_name: '确认购买',
          func: () => {
            console.log('确认购买')
          }
        }
      ],
      tableHeader: [
        {
          prop: 'id',
          label: '编号'
        },
        {
          prop: 'bookName',
          label: '书名'
        },
        {
          prop: 'createTime',
          label: '采购时间'
        },
        {
          prop: 'num',
          label: '采购数量'
        },
        {
          prop: 'price',
          label: '价格'
        }
      ],
      tableData: [
        // { id: '1', bookName: '平凡的世界', author: 'xxx', buyTime: '2020-9-28', buyCounts: '54', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', buyTime: '2020-9-28', buyCounts: '54', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', buyTime: '2020-9-28', buyCounts: '54', allCounts: '105' }
      ]
    }
  },
  methods: {
    getExcelData (tableHeader, tableData) {
      this.tableHeader = tableHeader
      this.tableData = tableData
      console.log(this.tableHeader)
      console.log(this.tableData)
    }
  }
}
</script>

<style lang="scss">
@import './style/bookPurchar.scss';
</style>
