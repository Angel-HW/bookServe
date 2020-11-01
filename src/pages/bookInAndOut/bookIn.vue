<template>
  <div id="book-in">
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
        :formatter="columnFormatter"
        show-overflow-tooltip
        sortable
      ></el-table-column>
    </c-table>
  </div>
</template>

<script>
import cTable from '../../components/c-table'
import cOperation from '../../components/c-operaion'
// import cDialog from '../../components/c-dialog'

export default {
  components: {
    'c-table': cTable,
    'c-operation': cOperation
    // 'c-dialog': cDialog
  },
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      dialogTitle: '',
      num: '',
      selectedRow: [],
      pageInfo: {
        pageSize: 3,
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
          ope_name: '确认入库',
          func: () => {
            console.log('确认入库')
            this.addck()
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
              this.deleteck()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        }
      ],
      dialogTableData: {},
      statusOptions: [
        { label: '已购买未入库', value: '2' }
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
          prop: 'num',
          label: '入库数量'
        },
        {
          prop: 'price',
          label: '单价'
        },
        {
          prop: 'status',
          label: '状态',
          disName: 'statusOptions'
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
    // 图书入库
    async addck () {
      console.log(this.selectedRow)
      const id = this.selectedRow.map(item => {
        return item.id
      }).toString()
      const bookName = this.selectedRow.map(item => {
        return item.bookName
      }).toString()
      const num = this.selectedRow.map(item => {
        return item.num
      }).toString()
      const price = this.selectedRow.map(item => {
        return item.price
      }).toString()
      try {
        await this.$api.bookIn.addck({
          id: id,
          bookName: bookName,
          num: num,
          price: price
        }).then(res => {
          // console.log(res)
          this.$router.push('/bookSearch')
          this.$message.success(res.msg)
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 查询未入库图书
    async getNoInck () {
      try {
        await this.$api.bookIn.getNoInck({
          pageNum: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }).then(res => {
          console.log(res)
          if (res.code > 199 && res.code < 300) {
            this.tableData = res.data.list
            this.pageInfo.total = res.data.total
            // this.$message.success(res.msg)
          } else {
            this.$message.info(res.msg)
          }
        })
      } catch {
        this.$message.error('数据获取失败')
      }
    },
    // 删除未入库图书
    async deleteck () {
      const ids = this.selectedRow.map(item => {
        return item.id
      }).toString()
      console.log(ids)
      try {
        await this.$api.bookIn.deleteck({
          id: ids
        }).then(res => {
          console.log(res)
          this.$message.success(res.msg)
          this.reload()
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
    // 表格页码
    sizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getNoInck()
    },
    // 表格翻页
    handleCurrentChange (pageNum) {
      this.pageInfo.currentPage = pageNum
      this.getNoInck()
    },
    // 表格数据选中
    handleSelectionChange (row) {
      // console.log(row)
      this.selectedRow = row
      console.log(this.selectedRow)
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
    this.getNoInck()
  }
}
</script>

<style lang="scss">
@import './style/bookIn.scss';
</style>
