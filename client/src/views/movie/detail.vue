<template>
    <base-box title="电影详情" type="primary">
        <template v-slot:title-addon>

          <!-- 当用户未登陆时不显示编辑电影 -->
          <div class="text-danger"
          @click.prevent="cancel()"
          v-if="($store.state.user!==null)&&($store.state.user.id === 3)">
             <i class="el-icon-delete">删除</i>
          </div>

            <div class="text-primary"
            style="margin-left: auto; cursor: pointer"
            @click="$router.push({path: '/movies/edit',query: {id: $route.params.id}})"
            v-if="($store.state.user!==null)&&($store.state.user.id === 3)">
              <i class="el-icon-edit">编辑</i>
            </div>
        </template>
        <div class="movie-item" v-if="movie">
            <h2>{{ movie.name }} <span class="text-info">{{ movie.year}}</span></h2>
            <img :src="movie.poster" :alt="movie.name" class="movie-poster">
            <ul class="movie-meta">
                <li><label class="text-info">导演：</label>{{movie.director}}</li>
                <li><label class="text-info">演员：</label> {{movie.actor}}</li>
                <li><label class="text-info">类型：</label>{{movie.genre}}</li>
                <li><label class="text-info">评分：</label>
                  <el-rate :value="movie.rating/2" disabled style="display: inline-block"></el-rate>
                  <span style="color: #ff9900">{{ movie.rating }}</span>
                </li>
                <li><label class="text-info">IMDB链接：</label>{{movie.imdb_id}}</li>
                <!-- button播放按钮 -->
                <li><el-button type="primary"
                  @click="$router.push({name: 'movie-player'})"
                ><i class="el-icon-caret-right"></i> 立即播放</el-button></li>
            </ul>
            <div class="movie-description">
              <h3 class="text-success">{{movie.name}}的剧情简介</h3>
            <p class="movie-description">{{ movie.description }}
            </p>
            </div>
        </div>
    </base-box>
</template>

<script>
import MovieService from '../../services/MovieService'
export default {
  data () {
    return {
      movie: {}
    }
  },
  async created () {
    // 调用接口服务获取数据信息
    let id = this.$route.params.id
    try {
      const response = await MovieService.getById(id)
      this.movie = response.data.movie
    } catch (error) {
      this.$message.error(`[${error.response.status}],数据查询异常请重试`)
    }
  },
  methods: {
    async cancel () {
      try {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let id = this.$route.params.id
          const response = await MovieService.delete(id)
          this.movie = response.data.movie
          this.$message({
            type: 'success',
            message: '删除成功!页面将在3秒后返回主界面',
            duration: 3000,
            onClose: () => {
              this.$router.push({ name: 'movie-list' })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        // let id = this.$route.params.id
        // const response = await MovieService.delete(id)
        // this.movie = response.data.movie
        // this.$message({
        //   message: '信息删除成功，页面将在3秒后自动跳转到列表页面',
        //   type: 'success',
        //   duration: 3000,
        //   onClose: () => {
        //     this.$router.push({ name: 'movie-list' })
        //   }
        // })
      } catch (error) {
        this.$message.error(`[${error.response.status}],删除失败请重试`)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .text-danger{
    position: absolute;
    margin-left: 830px;
    cursor: pointer;
  }
  .movie-item{
      padding: 0 10px;
      .movie-poster {
          width: 135px;
          height: 200px;
          float: left;
          object-fit: cover;
      }
      .movie-meta{
          list-style: none;
          margin-left: 120px;
          font-size: 14px;
          li {
              line-height: 1.5;
          }
      }
      .movie-description {
          clear: both;
          text-indent: 20px;
          line-height: 1.5;
          font-size: 14px;
          h3{
              font-weight: 400;
              padding: 0;
              margin: 0;
              text-indent: 0;
              padding-top: 10px;
          }
          p{
              margin: 0;
          }
      }
  }
</style>
