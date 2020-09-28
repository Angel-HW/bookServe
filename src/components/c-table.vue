<template>
  <div id="c-table">
    <div class="table-box">
      <div class="table-operate">
        <el-button
          type="primary"
          v-for="(item,key) in btnList"
          :key="key"
          @click="item.clickName"
          >
          {{ item.ope_name }}
        </el-button>

        <div class="search" v-if="showInput">
          <el-input
            placeholder="输入货品关键字进行搜索"
            v-model="inputValue"
          >
          </el-input>
          <i class="el-icon-search"></i>
        </div>
      </div>
      <el-table
        :data="dialog_tableData"
      >
        <el-table-column
          label="操作"
          v-if="showOperateBtn"
        >
          <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
          v-if="showSelection">
        </el-table-column>
        <el-table-column
          v-for="(item,key) in dialog_tableHeader"
          :key="key"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CTable',
  props: {
    showSelection: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    showInput: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    showOperateBtn: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    btnList: {
      type: Array,
      default: () => {
        return []
      }
    },
    dialog_tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    dialog_tableHeader: {
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
    buttonDialog () {
      console.log('buttonDialog')
      this.$emit('buttonDialog')
    },
    showVdiolagy (value) {
      console.log(value)
    },
    deleteData (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
#c-table {
  .table-box {
    .table-operate {
      display: flex;
      justify-content: space-between;
      .search {
        width: 30%;
        display: flex;
        align-items: center;
        position: relative;
        .el-input {
          width: 100%;
        }
        i {
          position: absolute;
          right: 10px;
        }
      }
    }
  }
}
</style>
