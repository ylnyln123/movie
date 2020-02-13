<template>
  <el-container>
    <el-header height="50px" class="bg-primary">
      <div class="header">
        <h1 style="font-style: italic">SuperMovie</h1>
        <span class="titleAD">你的专属电影</span>
        <div>
          <el-dropdown @command="handCommand">
            <span class="el-dropdown-link text-white"><i class="el-icon-s-tools">设置</i></span>
            <el-dropdown-menu>
              <el-dropdown-item command="login">登录</el-dropdown-item>
              <el-dropdown-item command="movie-create">新增电影</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
export default {
  methods: {
    handCommand (routerName) {
      this.$router.push({ name: routerName })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    display: flex;
    color: white;
  }
  h1{
    margin: 2px 0;
    margin-right: auto;
  }
  .el-icon-s-tools{
    margin-top: 15px;
    margin-right: 30px;
  }
  .titleAD{
    font-family: cursive;
    position: absolute;
    margin-left: 182px;
    margin-top: 20px;
    font-style: italic;
  }
</style>
