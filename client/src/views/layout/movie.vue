<template>
  <el-container>
    <el-header height="50px" class="bg-primary">
      <div class="header">
        <h1 style="font-style: italic;cursor: pointer;" @click="$router.push('/')">SuperMovie</h1>
        <span class="titleAD">你的专属电影</span>
        <div>
          <template v-if="!$store.state.isUserLogin">
            <span @click="$router.push({name: 'login'})" class="login_register">登录 |</span>&nbsp;
            <span @click="$router.push({name: 'register'})" class="login_register">注册</span>
          </template>
          <div v-else>
             <span class="chat" @click="open">
             <i class="el-icon-chat-line-square"></i>
             &nbsp;&nbsp;MC聊天室</span>
            <el-dropdown @command="handCommand">
              <span class="el-dropdown-link text-white">
                <i class="el-icon-s-custom">&nbsp;{{ $store.state.user.email }}</i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" class="menu_item">退出</el-dropdown-item>
                <!-- <el-dropdown-item command="movie-create">新增电影</el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
          </div>
        </div>
      </div>
    </el-header>
     <router-view class="container"></router-view>
  </el-container>

</template>

<script>
import { mapActions } from 'vuex'
import store from '../../store'
export default {
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    handCommand (routerName) {
      if (routerName === 'logout') {
        this.logout()
      } else {
        this.$router.push({ name: routerName })
      }
    },
    logout () {
      this.setUser(null)
      this.setToken('')
      this.$router.push({ name: 'movie-list' })
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
  .header{
    display: flex;
    color: white;
     h1{
    margin: 3px 0;
    margin-right: auto;
  }
  }
  .login_register{
    cursor: pointer;
  }
  .el-icon-s-custom{
    margin-top: 15px;
    margin-right: 30px;
    cursor: pointer;
  }
  .titleAD{
    font-family: cursive;
    position: absolute;
    margin-left: 182px;
    margin-top: 20px;
    font-style: italic;
  }
  .container{
    width: 960px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .chat{
    color: white;
    font-style: italic;
    font-family: cursive;
    position: relative;
    left: -20px;
    cursor: pointer;
  }
</style>
