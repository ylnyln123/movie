<template>
<div>
  <div class="title">
      <span><i class="el-icon-arrow-left" @click="$router.push('/')" style="cursor: pointer">返回首页</i></span>
      <span>|</span>
      <span>{{ movie.name }}</span>
  </div>
  <div class="player">
      <!-- <video src="../../../../server/video_resources/1.mp4"></video> -->
      <video :src="movie.video_url" class="player_video" controls></video>
  </div>
</div>
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
      console.log(this.movie.video_url)
    } catch (error) {
      this.$message.error(`[${error.response.status}],数据查询异常请重试`)
    }
  }
}

</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .title{
        position: relative;
        left: -80px;
        // margin-top: 10px;
          span{
              margin: 0 15px 0 0;
              font-size:18px;
              color: #909399;
          }
    }
    .player{
       position: relative;
       width: 1100px;
       height: 460px;
       background-color: #000000;
       margin: 0 auto;
       left: -75px;
       top: 15px;
       display: inline-block;
    }
    .player_video{
        // position: absolute;
        // left:50%;
        // margin-left: -425px;
        width: 100%;
        height: 100%;
    }
</style>
