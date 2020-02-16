<template>
  <base-box type="primary" title="电影">
    <template v-slot:title-addon>
        <div class="filter">
            <label>最新</label>
            <label>高分</label>
            <label>动作</label>
            <label>剧情</label>
        </div>
         <!-- <div v-if="$store.state.user==null">
            <el-button type="text" @click="open"></el-button>
         </div> -->

         <!-- 当用户未登陆时不显示新增电影 -->
         <div
         class="text-success"
         style="margin-left: auto; cursor: pointer"
         @click="$router.push({name: 'movie-create'})"
         v-if="($store.state.user!==null)&&($store.state.user.id === 3)">
            <i class="el-icon-plus">新增电影</i>
          </div>
    </template>
        <div class="movie-list" >
            <a
            class="movie-item"
            @click="$router.push({name: 'movie-detail',params: {id: movie.id}})"
            v-for="movie in movies"
            :key="movie.id">
            <img :src="movie.poster"
            :alt="movie.name" />
              <p>{{ movie.name}} <strong>{{ movie.rating }}</strong></p>
            </a>
        </div>
  </base-box>
</template>

<script>
export default {
  data () {
    return {
      movies: []
    }
  },
  // methods: {
  //   open () {
  //     this.$alert('请先登录', {
  //       confirmButtonText: '确定',
  //       callback: action => {
  //         this.$message({
  //           type: 'info',
  //           message: `action: ${action}`
  //         })
  //       }
  //     })
  //   }
  // },
  created () {
    // TODO：调用接口获取数据列表
    this.movies = [
      {
        id: 1,
        name: '哪吒',
        poster: 'http://5b0988e595225.cdn.sohucs.com/images/20190724/0b29bd74e7d64122be74982bfffd2c45.jpeg',
        rating: 8.6
      },
      {
        id: 2,
        name: '哪吒',
        poster: 'http://5b0988e595225.cdn.sohucs.com/images/20190724/0b29bd74e7d64122be74982bfffd2c45.jpeg',
        rating: 8.6
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
    .filter{
        margin-left: 10px;
        label{
            margin-right: 10px;
            color: #9b9b9b;
            font-size: 13px;
            cursor: pointer;
        }
    }
    .filter>label:hover{
        color: #3a3a3a;
        font-size: 14px;
    }
    .movie-list{
        .movie-item{
            display: block;
            margin: 10px;
            float: left;
            font-size: 13px;
            width: 114px;
            cursor: pointer;
            img {
                height: 160px;
                width: 100%;
                object-fit: cover;
            }
            p{
                text-align: center;
                strong{
                    color: #e09015
                }
            }
        }
    }
</style>
