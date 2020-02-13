<template>
  <base-box type="primary" title="电影">
    <template v-slot:title-addon>
        <div class="filter">
            <label>最新</label>
            <label>高分</label>
            <label>动作</label>
            <label>剧情</label>
        </div>
         <div class="text-success" style="margin-left: auto; cursor: pointer" @click="$router.push({name: 'movie-create'})">
                <i class="el-icon-plus"></i>
                新增电影
            </div>
    </template>
        <div class="movie-list">
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
  created () {
    // TODO：调用接口获取数据列表
    this.movies = [
      {
        id: 1,
        name: '哪吒',
        poster: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1581581931&di=d5915b1390ac7cd394ba7b67845431e6&src=http://107cine.cdn.cinehello.com/20190903/uploads/weixin/03Sep2019215031540.jpg',
        rating: 8.6
      },
      {
        id: 2,
        name: '哪吒',
        poster: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1581581931&di=d5915b1390ac7cd394ba7b67845431e6&src=http://107cine.cdn.cinehello.com/20190903/uploads/weixin/03Sep2019215031540.jpg',
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
