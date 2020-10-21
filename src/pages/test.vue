<template>
  <div id="test">
    <c-upload-excel
    @getExcelData="getExcelData">
    </c-upload-excel>
    <c-table
      :showSelection="true"
      :showInput="true"
      :showOperate="false"
      :CTableData="tableData"
      :CTableHeader="tableHeader"
    >
      <!-- <el-table-column>
        <template slot-scope="scope">
          <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
        </template>
      </el-table-column> -->
    </c-table>
  </div>
</template>

<script>
import cUploadExcel from '../components/c-uploadExcel'
import CTable from '../components/c-table'

export default {
  name: 'test',
  components: {
    'c-upload-excel': cUploadExcel,
    'c-table': CTable
  },
  data () {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    getExcelData (tableHeader, tableData) {
      this.tableHeader = tableHeader
      this.tableData = tableData
      // console.log('in test')
      // console.log(data)
      // // let id = 1
      // this.tableHeader = Object.keys(data[0]).map(item => {
      //   const header = {}
      //   header.prop = item
      //   // id += 1
      //   header.label = item
      //   console.log(header)
      //   return header
      // })
      // this.tableData = data
      // console.log(this.tableHeader)
    }
  }
}
</script>
