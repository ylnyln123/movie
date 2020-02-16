<template>
  <el-container>
    <el-header height="50px" class="bg-primary">
      <div class="header">
        <h1 style="font-style: italic" @click="$router.push('/')">SuperMovie</h1>
        <span class="titleAD">你的专属电影</span>
        <div>
          <template v-if="!$store.state.isUserLogin">
            <span @click="$router.push({name: 'login'})" class="login_register">登录 |</span>&nbsp;
            <span @click="$router.push({name: 'register'})" class="login_register">注册</span>
          </template>
          <div v-else>
            <el-dropdown @command="handCommand">
              <span class="el-dropdown-link text-white">
                <i class="el-icon-s-custom">&nbsp;{{ $store.state.user.email }}</i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" class="menu_item">退出</el-dropdown-item>
                <!-- <el-dropdown-item command="movie-create">新增电影</el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>
     <router-view class="container"></router-view>
  </el-container>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    handCommand (routerName) {
      if (routerName === 'logout') {
        this.logout()
      } else {
        this.$router.push({ name: routerName })
      }
    },
    logout () {
      this.setUser(null)
      this.setToken('')
      this.$router.push({ name: 'movie-list' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    display: flex;
    color: white;
     h1{
    margin: 3px 0;
    margin-right: auto;
  }
  }
  .login_register{
    cursor: pointer;
  }
  .el-icon-s-custom{
    margin-top: 15px;
    margin-right: 30px;
    cursor: pointer;
  }
  .titleAD{
    font-family: cursive;
    position: absolute;
    margin-left: 182px;
    margin-top: 20px;
    font-style: italic;
  }
  .container{
    width: 960px;
    margin: 0 auto;
    margin-top: 10px;
  }
</style>
