<template>
    <div class="register-container">
      <el-form
        ref="registerForm"
        label-width="150px"
        class="register-form"
        :model="registerForm"
        :rules="registerRules"
      >
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      registerForm: {
        email: '',
        password: '',
        comparePassword: ''
      },

      // 校验规则
      registerRules: {
        email: { type: '邮箱', required: true, massage: '请输入正确的邮箱' }
      }
    }
  }
}
</script>
