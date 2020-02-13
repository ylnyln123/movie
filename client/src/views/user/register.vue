<template>
  <div>
    <div class="logo">
      <img src="../../../images/logo.png" alt="">
    </div>
      <div class="register-container">
        <el-form
          ref="registerForm"
          label-width="90px"
          class="register-form"
          :model="registerForm"
          :rules="registerRules"
        >
        <div class="register-error">{{this.error}}</div>
        <el-form-item prop="email" label="邮箱" class="email">
          <el-input v-model="registerForm.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码" >
          <el-input v-model="registerForm.password" placeholder="请输入8-16位密码" type="password"></el-input>
        </el-form-item>

        <el-form-item prop="comparePassword" label="确认密码">
          <el-input v-model="registerForm.comparePassword" placeholder="请再次输入密码" type="password"></el-input>
        </el-form-item>
        <el-button class="registerbutton" type="primary" plain native-type="submit" :loading="loading" @click.prevent="register">开始我的SuperMovie之旅</el-button>
        <div class="register-info">如果您已有账号，请<router-link :to="{name:'login'}">点此登陆</router-link></div>
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
      registerForm: {
        email: '',
        password: '',
        comparePassword: ''
      },

      // 校验规则
      registerRules: {
        email: { type: 'email', required: true, massage: '请输入正确的邮箱', trigger: 'blur' },
        password: { type: 'string', required: true, massage: '密码不得为空', trigger: 'blur' },
        comparePassword: {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: function (rule, value, callback) {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
              callback(new Error('两次密码不一致，请重新输入'))
            } else {
              callback()
            }
          }.bind(this)
        }
      }
    }
  },
  methods: {
    register () {
      this.$refs['registerForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.error = ''
          try {
            const response = await UserService.register(
              {
                email: this.registerForm.email,
                password: this.registerForm.password
              }
            )
            if (response.data.code !== 200) {
              this.error = response.data.error
            } else {
              // 将用户信息和token保存到vuex
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.user)
              // this.$store.dispatch('setvip', response.data.vip)
              this.$router.push('/')
            }
            this.loading = false
          } catch (error) {
            if (error.response.data.error) {
              this.error = error.response.data.error
            } else {
              this.error = '注册失败，请重试'
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
    left: -50px;
    top: -190px;
  }
  .register-container{
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
    .register-form{
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

    .register-info {
      text-align: right;
      font-size: 0.9rem;
      margin-top: 15px;
      color: #909399
    }
    .register-error{
      color: #F56C6C;
    }
     .registerbutton{
       position: relative;
       margin-left: 110px;
    }
    }
  }
</style>
