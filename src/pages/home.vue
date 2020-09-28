<template>
  <div id="home">
    <el-container class="first-container">
      <el-aside width="200px">
        <div class="logo">
          <h1>第三组</h1>
        </div>
        <!-- 管理员菜单 -->
        <div class="menu">
          <el-menu router>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-reading"></i>图书管理</template>
              <el-menu-item-group>
                <template slot="title">子菜单</template>
                <el-menu-item index="/bookPurchar">图书采购</el-menu-item>
                <el-menu-item index="/bookInOut">图书出入库</el-menu-item>
                <el-menu-item index="/bookSearch">图书查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-order"></i>借还管理</template>
              <el-menu-item-group>
                <template slot="title">子菜单</template>
                <el-menu-item index="/bookBorAndRet">借还图书</el-menu-item>
                <el-menu-item index="/bookBRSearch">借还图书查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
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
          <span>管理员</span>
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
    }
  },
  computed: {
    userType () {
      // return JSON.parse(sessionStorage.getItem('roleInfo')).role
      return '1'
    }
  }
}
</script>

<style lang="scss">
#home {
  .first-container {
    height: 100vh;
    border: 1px solid #eee;
    .el-aside {
      color: white;
      background-color: rgb(46, 62, 82);
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
          background-color: rgb(46, 62, 82);
          .el-submenu {
            border-top: 1px solid #dddddd;
            .el-submenu__title {
              color: white;
            }
            .el-submenu__title:hover {
              color: black;
            }
            .el-menu-item-group {
              background-color: rgb(0, 21, 40);
              .el-menu-item {
                color: white;
              }
              .el-menu-item:hover {
                color: black;
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
