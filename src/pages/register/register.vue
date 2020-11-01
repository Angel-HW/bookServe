<template>
  <div id="register">
    <div class="box">
      <el-image :src="require('../login/loginlogo.jpeg')"></el-image>
      <el-form :model="form" :rules="rules" ref="form">
        <h2>注册</h2>
        <img class="toLogin" src="./arrow_lift.png" alt="" @click="toLogin">
        <el-form-item label="用户账号" prop="userAccout">
          <el-input v-model="form.userAccout"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="form.userSex">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="userPassWord">
          <el-input type="password" v-model="form.userPassWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirmPassWord">
          <el-input type="password" v-model="form.comfirmPassWord"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone"></el-input>
        </el-form-item>
        <div class="operate">
          <el-button type="primary" @click="registerData()">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    const comfirmPassWord = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.userPassWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const userAccout = (rule, value, callback) => {
      const isletter = /^[a-z]/i
      if (value === undefined) {
        callback(new Error('请输入用户账号'))
      } else if (isletter.test(value) === false) {
        callback(new Error('请输入以字母开头的账号'))
      } else {
        callback()
      }
    }
    return {
      genderOptions: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ],
      form: {
      },
      rules: {
        userAccout: [
          { required: true, validator: userAccout, trigger: 'blur' },
          { min: 3, message: '不少于3个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '不少于3个字符', trigger: 'blur' }
        ],
        userSex: [
          { required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        userPassWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' }
        ],
        comfirmPassWord: [
          { required: true, validator: comfirmPassWord, trigger: 'blur' },
          { min: 6, message: '不少于6个字符', trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { min: 11, max: 11, message: '请输入正确的11位手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerData () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await this.$api.register.register({
              ...this.form
            }).then(res => {
              if (res.code > 199 && res.code < 300) {
                this.$message.success(res.msg)
                this.$router.push('/')
              } else {
                this.$message.error(res.msg)
              }
            })
          } catch {
            this.$message.error('获取数据失败')
          }
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    // 返回登录
    toLogin () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
#register {
  height: 100vh;
  background-color: rgb(53, 147, 207);
  .box {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45%;
    // height: 500px;
    box-shadow: 10px 10px 10px 10px #000000;
    .el-image {
      width: 35%;
    }
    .el-form {
      position: relative;
      flex: 1;
      border: 1px solid #dddddd;
      padding: 30px 0;
      background-color: #fff;
      h2 {
        text-align: center;
        margin: 0;
      }
      .toLogin {
        position: absolute;
        top: 33px;
        left: 20px;
        width: 20px;
        height: auto;
      }
      .el-form-item {
        display: flex;
        justify-content: center;
        margin: 20px auto;
        padding: 0 40px;
        box-sizing: border-box;
        .el-form-item__label {
          width: 80px;
        }
        .el-form-item__content {
          width: 60%;
          .el-select {
            width: 100%
          }
        }
      }
      .operate {
        position: relative;
        text-align: center;
        .el-button {
          width: 50%;
        }
      }
    }
  }
}
</style>
