<template>
  <div id="home">
    <el-container class="first-container">
      <el-aside width="200px">
        <div class="logo">
          <h1>第三组</h1>
        </div>
        <div class="menu">
        <!-- 管理员菜单 -->
          <el-menu router :default-active="$route.path" v-show="userInfo.userRole === '1'">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-reading"></i>图书管理</template>
              <el-menu-item-group>
                <template slot="title">子菜单</template>
                <el-menu-item index="/bookPurchar">图书采购</el-menu-item>
                <el-menu-item index="/bookIn">图书入库</el-menu-item>
                <el-menu-item index="/bookOut">图书出库</el-menu-item>
                <el-menu-item index="/bookSearch">图书查询</el-menu-item>
                <el-menu-item index="/bookBorrow">图书借阅</el-menu-item>
                <el-menu-item index="/bookReturn">图书归还</el-menu-item>
                <el-menu-item index="/bookBRSearch">借阅图书查询</el-menu-item>
                <el-menu-item index="/test">测试</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
              <el-menu-item-group>
                <template slot="title">子菜单</template>
                <el-menu-item index="/adminInfo">用户信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <!-- 客户菜单 -->
          <el-menu router :default-active="$route.path" v-show="userInfo.userRole === '2'">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-reading"></i>图书管理</template>
              <el-menu-item-group>
                <template slot="title">子菜单</template>
                <el-menu-item index="/bookSearch">图书查询</el-menu-item>
                <el-menu-item index="/bookBorrow">图书借阅</el-menu-item>
                <el-menu-item index="/bookReturn">图书归还</el-menu-item>
                <el-menu-item index="/bookBRSearch">借阅图书查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
              <el-menu-item-group>
                <template slot="title">子菜单</template>
                <el-menu-item index="/adminInfo">用户信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>

      <el-container class="second-container">
        <el-header>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
              <!-- <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <span>{{ userInfo }}</span> -->
          <span>{{ userInfo.userName }}</span>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      defaultUrl: ''
    }
  },
  methods: {
    loginOut () {
      try {
        this.$api.logout()
        sessionStorage.clear('roleInfo')
        this.$router.push('/')
        this.$message.success('退出成功')
      } catch {
        this.$message.error('操作失败')
      }
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }
  },
  mounted () {
    const href = window.location.href
    this.defaultUrl = href.split('/#')[1]
  }
}
</script>

<style lang="scss">
#home {
  .first-container {
    height: 100vh;
    // border: 1px solid #eee;
    .el-aside {
      color: white;
      background-color: rgb(42, 58, 76);
      .logo {
        width: 200px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        h1 {
          border-right: 1px solid #ffffff;
          margin: 0;
        }
      }
      .menu {
        .el-menu {
          background-color: rgb(42, 58, 76);
          border-right: solid 1px #000000;
          .el-submenu {
            border-top: 1px solid #dddddd;
            .el-submenu__title {
              color: white;
            }
            .el-submenu__title:hover {
              background-color: rgb(0, 21, 40)!important;
            }
            .el-menu-item-group {
              background-color: rgb(31, 45, 61);
              .el-menu-item {
                color: white;
              }
              .el-menu-item.is-active {
                color: #1890ff!important;
              }
              .el-menu-item:hover {
                background-color: rgb(0, 21, 40)!important;
              }
              .el-menu-item:focus {
                background-color: rgb(0, 21, 40)!important;
              }
            }
          }
        }
      }
    }
    .second-container {
      .el-header {
        background-color: #ffffff;
        color: #333;
        line-height: 60px;
        text-align: right;
        font-size: 12px
      }
      .el-main {
        background-color: #dddddd;
      }
    }
  }
}
</style>
