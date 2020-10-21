<template>
  <div id="upload-excel">
    <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
    <el-upload
      class="upload-demo"
      action=""
      :on-change="handleChange"
      :on-remove="handleRemove"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      :auto-upload="false"
      :show-file-list="false">
      <el-button type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
/* eslint-disable */
// import XLSX from 'xlsx'

export default {
  data () {
    return {
      outData: []
    }
  },
  // watch: {
  //   'outData': function () {
  //     console.log(this.outData)
  //     this.$emit('getExcelData', this.outData)
  //   }
  // },
  methods:{
    outDatatotset (tableHeader, tableData) {
      // console.log('in outData')
      this.$emit('getExcelData', tableHeader, tableData)
    },
    changeTableData () {
      const tableHeader = Object.keys(this.outData[0]).map(item => {
        const header = {}
        header.prop = item
        // id += 1
        header.label = item
        return header
      })
      const tableData = this.outData
      this.outDatatotset (tableHeader, tableData)
    },
    handleChange (file, fileList) {
      // console.log(file)
      // console.log(fileList)
      // 覆盖上次上传的文件
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.fileTemp = file.raw;
      if(this.fileTemp){
        if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') 
          || (this.fileTemp.type == 'application/vnd.ms-excel')){
          this.importfxx(this.fileTemp)
        } else {
          this.$message({
            type:'warning',
            message:'附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type:'warning',
          message:'请上传附件！'
        })
      }
    },
    // handleExceed (files, fileList) {
    //   this.$message({
    //     type:'warning',
    //     message:'超出最大上传文件数量的限制！'
    //   })
    //   if (fileList.length > 1) {
    //     this.fileList.splice(0, 1);
    //   }
    //   return
    // },
    handleRemove (file,fileList) {
      this.fileTemp = null
    },
    importfxx (obj) {
      let _this = this
      // console.log(_this)
      let inputDOM = this.$refs.inputer
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0]

      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file

      var reader = new FileReader();
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
          var binary = ''
          var rABS = false // 是否将文件读取为二进制字符串
          var pt = this
          var wb // 读取完成的数据
          var outdata
          var reader = new FileReader()
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result)
            var length = bytes.byteLength
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i])
            }
            var XLSX = require("xlsx")
            if (rABS) {
                wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
                })
            } else {
                wb = XLSX.read(binary, {
                type: "binary"
                })
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // outdata就是你想要的东西
            // console.log('未处理的原始数据如下：')
            // console.log(outdata)
            _this.outData = outdata
            _this.changeTableData()
            return outdata
          };
          reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    }
  }
}
</script>

<style lang="scss">
#upload-excel {
  .upload-demo {
    display: flex;
    .el-button {
      margin-right: px;
    }
  }
}
</style>
