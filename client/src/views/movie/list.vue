<template>
  <base-box type="primary" title="电影">
    <template v-slot:title-addon>
        <div class="filter">
            <label @click="orderBy('rating',$event)">最新</label>
            <label @click="orderBy('rating',$event)">高分</label>
            <label @click="filterByGenre('动作')">动作</label>
            <label @click="filterByGenre('剧情')">剧情</label>
        </div>
      <div>
        <el-input placeholder="电影检索" v-model="search_content" class="input-with-select" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    <!-- <i class="el-icon-search"></i> -->
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
import MovieService from '../../services/MovieService'
export default {
  data () {
    return {
      movies: [],
      search_content: ''
    }
  },
  async created () {
    // TODO：调用接口获取数据列表

    try {
      const response = await MovieService.getAll()
      this.movies = response.data.movies
      // let chat = 'http://localhost:8081/?' + response.data.movies.name
      // this.chat = chat
    } catch (error) {
      this.$message.error(`[${error.response.status}],数据查询异常请重试`)
    }
  },
  methods: {
    async orderBy (field, event) {
      let query = `orderby=${field}`
      try {
        const response = await MovieService.getAll(query)
        this.movies = response.data.movies
      } catch (error) {
        this.$message.error(`[${error.response.status}],数据查询异常请重试`)
      }
    },
    async filterByGenre (genre, event) {
      let query = `genre=${genre}`
      try {
        const response = await MovieService.getAll(query)
        this.movies = response.data.movies
      } catch (error) {
        this.$message.error(`[${error.response.status}],数据查询异常请重试`)
      }
    },
    async search () {
      let query = `name=${this.search_content}`
      try {
        const response = await MovieService.getAll(query)
        this.movies = response.data.movies
        this.$message({
          message: '搜索成功，共有' + this.movies.length + '条结果，点击"最新"可回到列表页',
          type: 'success'
        })
      } catch (error) {
        this.$message.error(`[${error.response.status}],数据查询异常请重试`)
      }
    }
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
    .input-with-select{
      position: relative;
      left: 70%;
      top: -2px;

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
