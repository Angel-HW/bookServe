<template>
  <div id="login">
    <div class="box">
      <el-image :src="require('./loginlogo.jpeg')"></el-image>
      <el-form :model="form">
        <h1>欢迎登录</h1>
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code"></el-input>
          <!-- <img :src="identifyCode" alt="验证码图片" @click="getIdenfyCode()"> -->
        </el-form-item>
        <el-form-item class="identifyCode">
          <el-image :src="identifyCode" @click="updateIdenfyCode()"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-checkbox v-model="checked">记住密码</el-checkbox> -->
          <span class="opra">
            <router-link class="router-link" to="/register">注册</router-link>
            <!-- <router-link class="router-link" to="/losePassword">忘记密码？</router-link> -->
          </span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  // let soreSrc = 'http://3091m9d958.zicp.vip/user/getImage',
  data () {
    return {
      form: {
        name: '',
        password: '',
        code: ''
      },
      identifyCode: '',
      checked: false
    }
  },
  methods: {
    // 更新验证码
    updateIdenfyCode () {
      const str = new Date().valueOf()
      // console.log(str)
      this.identifyCode = 'http://3091m9d958.zicp.vip/Api/getImage?' + str
    },
    // 获取验证码
    async getIdenfyCode () {
      try {
        await this.$api.getImage()
        // this.identifyCode = 'http://3091m9d958.zicp.vip/user/getImage'
        this.updateIdenfyCode()
        // console.log(res)
      } catch {
        this.$message.error('验证码获取失败')
      }
    },
    async login () {
      // this.$router.push('/home')
      try {
        await this.$api.login({
          ...this.form
        }).then(res => {
          if (res.code >= 200 && res.code < 300) {
            sessionStorage.setItem('roleInfo', JSON.stringify(res))
            sessionStorage.setItem('key_token', JSON.stringify(res.data))
            // this.$store.commit('set_token', res.data);
            this.$message.success(res.msg)
            this.$router.push('/home')
          } else {
            this.$message.error(res.msg)
            console.log(res)
          }
        })
      } catch {
        this.$message.error('登录失败')
      }
    }
  },
  created () {
    this.getIdenfyCode()
  }
}
</script>

<style lang="scss">
#login {
  height: 100vh;
  background-color: rgb(53, 147, 207);
  .box {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 400px;
    box-shadow: 10px 10px 10px 10px #000000;
    .el-image {
      width: 35%;
      margin: 0;
    }
    .el-form {
      flex: 1;
      border: 1px solid #dddddd;
      padding: 30px 0;
      background-color: #fff;
      h1 {
        text-align: center;
        margin: 0;
      }
      .identifyCode {
        height: 56px;
        .el-form-item__content{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .el-form-item {
        margin: 10px auto;
        width: 80%;
        .el-form-item__label {
          width: 62px;
        }
        .el-input {
          width: 80%;
        }
        .el-button {
          width: 90%;
          margin-left: 10px;
        }
      }
      .el-form-item:last-child {
        position: relative;
        .opra {
          position: absolute;
          right: 5%;
          a {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
