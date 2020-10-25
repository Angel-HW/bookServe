<template>
  <div id="c-operaion">
    <div class="operation-box">
      <el-button
        v-for="(item,key) in tableBtnList"
        :type="item.type"
        :key="key"
        @click="item.func"
        >
        {{ item.ope_name }}
      </el-button>
    </div>
    <slot></slot>
    <div class="search">
      <el-select v-model="keyWord" placeholder="请选择">
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        placeholder="输入关键字进行搜索"
        v-model="inputValue"
      >
      </el-input>
      <i class="el-icon-search" @click="keyWordSearch"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableBtnList: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchOptions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      inputValue: '',
      keyWord: ''
    }
  },
  methods: {
    keyWordSearch () {
      this.$emit('keyWordSearch', this.keyWord, this.inputValue)
    }
  }
}
</script>

<style lang="scss">
#c-operaion {
  display: flex;
  justify-content: space-between;
  // .operation-box {
  // }
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
</style>
