<template>
  <div id="book-out">
    <div class="operation-box">
      <c-operation
        :tableBtnList="tableBtnList"
        :searchOptions="searchOptions"
      >
      </c-operation>
    </div>
    <c-table
      :showSelection="true"
      :showTableOperateBtn="false"
      :CTableData="tableData"
      :pageInfo="pageInfo"
      @sizeChange="sizeChange"
      @handleCurrentChange="handleCurrentChange"
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
import COperation from '../../components/c-operaion'

export default {
  components: {
    'c-table': CTable,
    'c-operation': COperation
  },
  inject: ['reload'],
  data () {
    return {
      num: '',
      selectedRow: [],
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
          btnkName: 'comfirm',
          ope_name: '出库',
          func: () => {
            console.log('出库')
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteBook()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
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
        // { id: '1', bookName: '平凡的世界', author: 'xxx', buyTime: '2020-9-28', buyCounts: '54', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', buyTime: '2020-9-28', buyCounts: '54', allCounts: '105' },
        // { id: '1', bookName: '平凡的世界', author: 'xxx', buyTime: '2020-9-28', buyCounts: '54', allCounts: '105' }
      ]
    }
  },
  methods: {
    // 删除图书
    async deleteBook () {
      const ids = this.selectedRow.map(item => {
        return item.id
      }).toString()
      console.log(ids)
      try {
        await this.$api.bookOut.deleteBook({
          id: ids
        }).then(res => {
          this.reload()
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 查询图书
    async getBookList () {
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
    getExcelData (tableHeader, tableData) {
      this.tableHeader = tableHeader
      this.tableData = tableData
      console.log(this.tableHeader)
      console.log(this.tableData)
    },
    sizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getBookList()
    },
    handleCurrentChange (pageNum) {
      this.pageInfo.currentPage = pageNum
      this.getBookList()
    },
    // 表格数据选中
    handleSelectionChange (row) {
      // console.log(row)
      this.selectedRow = row
      console.log(this.selectedRow)
    }
  },
  mounted () {
    this.getBookList()
  }
}
</script>

<style lang="scss">
@import './style/bookOut.scss';
</style>
