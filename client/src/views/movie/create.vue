<template>
<div>
    <base-box type="primary" title="新增信息">
    <el-form ref="movie-form" :model="form" :rules="rules" label-width="100px">
      <el-row>
          <el-col :span="12">
              <el-form-item label="电影名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入电影名称"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="12">
              <el-form-item label="电影类别" prop="genre">
                  <el-input v-model="form.genre" placeholder="请输入电影类别"></el-input>
              </el-form-item>
          </el-col>

           <el-col :span="12">
              <el-form-item label="电影导演" prop="director">
                  <el-input v-model="form.director" placeholder="请输入电影导演"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="12">
              <el-form-item label="电影演员" prop="actor">
                  <el-input v-model="form.actor" placeholder="请输入电影演员"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="12">
              <el-form-item label="资源地址" prop="video_url">
                  <el-input v-model="form.video_url" placeholder="http://localhost:3000/static/" type="text">
                   </el-input>
              </el-form-item>
          </el-col>

           <el-col :span="12">
              <el-form-item label="电影IMDB" prop="imdb_id">
                  <el-input v-model="form.imdb_id" placeholder="请输入电影IMDB"></el-input>
              </el-form-item>
          </el-col>

           <el-col :span="12">
              <el-form-item label="电影年份" prop="year">
                  <el-input type="number" v-model="form.year" placeholder="请输入电影年份/上映时间"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="12">
              <el-form-item label="电影海报" prop="poster">
                  <el-input v-model="form.poster" placeholder="请输入电影海报地址"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="12">
              <el-form-item label="电影评分" prop="rating">
                  <el-input v-model="form.rating" placeholder="请输入电影评分"></el-input>
              </el-form-item>
          </el-col>

          <el-col :span="24">
              <el-form-item label="电影简介" prop="description">
                  <el-input type="textarea" :rows="6" v-model="form.description" placeholder="请输入电影简介"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center">
              <el-button
                :loading="loading"
                type="primary"
                native-type="submit"
                @click.prevent="submit('movie-form')"
              >保存</el-button>
              <el-button type="warning" @click="reset('movie-form')">重置</el-button>
          </el-col>
      </el-row>
    </el-form>
    </base-box>
</div>
</template>

<script>
import MovieService from '../../services/MovieService'
export default {
  data () {
    return {
      loading: false,
      isEdit: false,
      form: {
        name: '',
        genre: '',
        director: '',
        actor: '',
        video_url: '',
        imdb_id: '',
        year: '',
        poster: '',
        rating: '',
        description: ''
      },
      rules: {
        name: { required: true, message: '请输入电影名称', trigger: 'blur' },
        genre: { required: true, message: '请输入电影类别', trigger: 'blur' },
        director: { required: true, message: '请输入电影导演', trigger: 'blur' },
        actor: { required: true, message: '请输入电影演员', trigger: 'blur' },
        video_url: { required: true, message: '请输入资源地址', trigger: 'blur' },
        imdb_id: { required: true, message: '请输入电影IMDB', trigger: 'blur' },
        year: { required: true, message: '请输入电影年份', trigger: 'blur' },
        poster: { required: true, message: '请输入电影海报地址', trigger: 'blur' },
        rating: { required: true, message: '请输入电影评分', trigger: 'blur' },
        description: { required: true, message: '请输入电影简介', trigger: 'blur' }
      }
    }
  },
  async created () {
    if (this.$route.query.id) {
      this.isEdit = true
      try {
        const response = await MovieService.getById(this.$route.query.id)
        this.form = response.data.movie
      } catch (error) {
        this.$message.error(`[${error.response.status}],数据查询异常请重试`)
      }
    } else {
      this.isEdit = false
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        this.loading = true
        if (valid) {
          // 调用接口服务，将数据发送给后台进行保存
          try {
            if (this.isEdit) {
              await MovieService.update(this.$route.query.id, this.form)
            } else {
              await MovieService.create(this.form)
            }
            this.$message({
              message: '信息保存成功，页面将在3秒后自动跳转到列表页面',
              type: 'success',
              duration: 3000,
              onClose: () => {
                this.$router.push({ name: 'movie-list' })
              }
            })
          } catch (error) {
            if (typeof error.response.data !== 'undefined' && error.response.data.error) {
              this.$message.error(error.response.data.error)
            } else {
              this.$message.error(`[${error.response.status}],数据处理异常请重试`)
            }
          } finally {
            this.loading = false
          }
        } else {
          this.loading = false
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>
