<template>
  <base-box type="primary" title="电影">
    <template v-slot:title-addon>
        <div class="filter">
            <label @click="orderBy('rating',$event)">最新</label>
            <label @click="orderBy('rating',$event)">高分</label>
            <label @click="filterByGenre('动作')">动作</label>
            <label @click="filterByGenre('剧情')">剧情</label>
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
            <!-- <a :href="'http://localhost:8081/?name='+ store.state.user.email">点击进入聊天室</a> -->
            <button v-if="$store.state.user!==null" @click="open">点击跳转</button>
        </div>
  </base-box>
</template>

<script>
import MovieService from '../../services/MovieService'
import store from '../../store'

export default {
  data () {
    return {
      movies: []
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
    open () {
      // eslint-disable-next-line no-undef
      var Base64 = { _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', encode: function (e) { var t = ''; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ''; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ''); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u !== 64) { t = t + String.fromCharCode(r) } if (a !== 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, 'n'); var t = ''; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ''; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
      window.open('http://localhost:8081/?name=' + Base64.encode(store.state.user.email) + Base64.encode('?id=' + store.state.user.id))
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
