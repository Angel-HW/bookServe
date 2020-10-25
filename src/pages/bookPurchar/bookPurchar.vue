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
      @selection-change="handleSelectionChange"
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
// import { delete } from 'vue/types/umd'

export default {
  components: {
    'c-table': CTable,
    'c-upload-excel': cUploadExcel,
    'c-operation': COperation
  },
  inject: ['reload'],
  data () {
    return {
      num: '',
      selectedRow: [],
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
            this.comfirmtoBuy()
          }
        }
      ],
      tableHeader: [
        {
          prop: 'bookName',
          label: '书名'
        },
        {
          prop: 'num',
          label: '采购数量'
        },
        {
          prop: 'price',
          label: '价格'
        },
        {
          prop: 'bookInType',
          label: '采购类型'
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
    // 确认购买
    async comfirmtoBuy () {
      const bookName = this.selectedRow.map(item => {
        return item.bookName
      }).toString()
      const num = this.selectedRow.map(item => {
        return item.num
      }).toString()
      const price = this.selectedRow.map(item => {
        return item.price
      }).toString()
      const bookInType = this.selectedRow.map(item => {
        return item.bookInType
      }).toString()
      try {
        await this.$api.bookPurchar.addcg({
          bookName: bookName,
          num: num,
          price: price,
          bookInType: bookInType
        }).then(res => {
          console.log(res)
          this.$router.push('/bookIn')
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    getExcelData (tableHeader, tableData) {
      this.tableData = tableData.map(item => {
        item.bookName = item['书名']
        item.num = item['采购数量']
        item.price = item['价格']
        item.bookInType = item['采购类型']
        delete item['书名']
        delete item['采购数量']
        delete item['价格']
        delete item['采购类型']
        return item
      })
    },
    handleSelectionChange (row) {
      // console.log(row)
      this.selectedRow = row
      console.log(this.selectedRow)
    }
  }
}
</script>

<style lang="scss">
@import './style/bookPurchar.scss';
</style>
