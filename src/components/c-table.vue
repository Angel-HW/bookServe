<template>
  <div id="c-table">
    <el-table
      :ref="refs"
      :data="CTableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="showSelection">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px"
        v-if="showTableOperateBtn"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editData(scope.$index)"></el-button>
          <!-- <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
    v-show="show_pagination"
    @size-change="sizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageInfo.currentPage"
    :page-sizes="[1, 2, 3, 12]"
    :page-size="pageInfo.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageInfo.total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CTable',
  props: {
    refs: {
      type: String,
      default: () => {
        return ''
      }
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          pageSize: 3,
          currentPage: 1,
          total: 0
        }
      }
    },
    show_pagination: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    showSelection: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    showTableOperateBtn: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    CTableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    editData (row) {
      console.log(row)
      this.$emit('editData', row)
    },
    // 修改当前页
    handleCurrentChange (value) {
      this.$emit('handleCurrentChange', value)
    },
    // 修改每页数量
    sizeChange (value) {
      this.$emit('sizeChange', value)
    },
    handleSelectionChange (row) {
      this.$emit('selection-change', row)
    }
  }
}
</script>

<style lang="scss">
#c-table {
  .el-pagination {
    background-color: #fff;
    text-align: right;
  }
}
</style>
