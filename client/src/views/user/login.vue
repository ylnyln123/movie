<template>
  <div>
    <div class="logo">
      <img src="../../../images/logo.png" alt="">
    </div>
      <div class="login-container">
        <el-form
          ref="loginForm"
          label-width="90px"
          class="login-form"
          :model="loginForm"
          :rules="loginRules"
        >
        <div class="login-error">{{this.error}}</div>
        <el-form-item prop="email" label="邮箱" class="email" >
          <el-input v-model="loginForm.email" placeholder="请输入注册时的邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-button class="loginbutton" type="primary" plain native-type="submit" :loading="loading" @click="login" style="width: 160px">登录</el-button>
        <div class="login-info">如果您没有账号，请<router-link :to="{name:'register'}">点击注册</router-link></div>
        </el-form>
        <div class="logo">
          <img src="../../../images/logo.png" alt="">
        </div>
      </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
export default {
  data () {
    return {
      loading: false,
      error: '',
      loginForm: {
        email: '',
        id: '',
        password: '',
        comparePassword: ''
      },

      // 校验规则
      loginRules: {
        email: { type: 'email', required: true, massage: '请输入正确的邮箱', trigger: 'blur' },
        password: { type: 'string', required: true, massage: '密码不得为空', trigger: 'blur' }
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.error = ''
          try {
            const response = await UserService.login(
              {
                email: this.loginForm.email,
                password: this.loginForm.password
              }
            )
            if (response.data.code !== 200) {
              this.error = response.data.error
            } else {
              // 将用户信息和token保存到vuex
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              this.$router.push('/')
            }
            this.loading = false
          } catch (error) {
            console.log(error)
            if (error.response.data.error) {
              this.error = error.response.data.error
            } else {
              this.error = '登陆失败，请重试'
            }
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .logo{
    position: absolute;
    margin-top: -400px;
    margin-left: 50px;
  }
  .login-container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: url("../../../images/bg6.jpg");
    // background: #fff;
    background-size: cover;

    // 窗口由上至下弹出动画效果
    @keyframes animate{
        from {
          margin-top: -500px;
        }
        to {
          margin-top: 139px;
        }
    }
    .login-form{
      animation: animate 1.5s ease infinite;
      animation-iteration-count:1;
      position: relative;
      width: 430px;
      margin: 140px auto 0;
      // margin-top: -500px;
      background-color: rgba(253, 252, 252, 0.7);
      border: solid rgb(238, 232, 232);
      border-radius:12px;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 35px;

    .login-info {
      text-align: right;
      font-size: 0.9rem;
      margin-top: 15px;
      color: #909399
    }
    .login-error{
      color: #F56C6C;
    }
    .loginbutton{
       position: relative;
       margin-left: 130px;
    }
    }
  }
</style>
