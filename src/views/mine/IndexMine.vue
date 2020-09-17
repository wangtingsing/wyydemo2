<template>
  <div class="">
    <div class="mine-bc" :style="{backgroundImage: 'url(' + bcImg + ')' }"></div>
    <div class="login-content">
      <div class="avtor">
        <span class="mine-avtor" :style="{backgroundImage: 'url(' + avatarUrl + ')' }"></span>
        <span class="des-login">{{nickname}}</span>
        <span class="btn-login" @click="$router.push('/login')" v-if="!isLogin">立即登录</span>
      </div>
      <!-- <i class="iconfont icon-yinle1"></i><span>本地音乐</span> -->
      <div class="list-cz">
        <div class="cz-item"><i class="iconfont icon-yinle1"></i><span>本地音乐</span></div>
        <div class="cz-item"><i class="iconfont icon-xiazainor"></i><span>下载管理</span></div>
        <div class="cz-item"><i class="iconfont icon-yinle2"></i><span>我的电台</span></div>
        <div class="cz-item"><i class="iconfont icon-xingxing"></i><span>我的收藏</span></div>
        <div class="cz-item"><i class="iconfont icon-xinde"></i><span>关注新歌</span></div>
      </div>
    </div>
    <div class="mine-music">
      <div class="my-music">我的音乐</div>
      <div class="my-music-content">
        <div class="my-music-item">
          <div class="m-m-i-c" @click="$router.push({ name: 'songlist', params: { 'uid': uid }})">
            <i class="iconfont icon-xin"></i>
            <div>我喜欢的音乐</div>
            <div class="heartmode heart-mode">
              <i class="el-icon-caret-right"></i>
              心动模式
            </div>
          </div>     
        </div>
        <div class="my-music-item">
          <div class="m-m-i-c">
            <i class="iconfont icon-diantai1"></i>
            <div>私人FM</div>
            <div class="heartmode">
              你的私人曲库
            </div>
          </div>   
        </div>
        <div class="my-music-item"></div>
      </div>
    </div>
    <div class="recently-music">
      <div class="rec-music">
        <span>最近播放</span>
        <span>更多></span>
      </div>
      <div class="rec-songlist">
        <div class="rec-songlist-item">
          <div class="songlist-img"></div>
          <span>hhh</span>
          <span>aaaa</span>
        </div>
        <div class="rec-songlist-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'IndexAudio',
  
  data () {
    return {
    
    }
  },
  created(){
    // if(isLogin){

    // }
    this.$store.commit('setBcgray')
  },
  computed:{
    ...mapState({isLogin:'isLogin',profile:'profile'}),
    bcImg(){
      if(this.isLogin){
        return this.profile.backgroundUrl 
      }else if(window.localStorage.getItem('profile-wyy')){
      
        console.log(window.localStorage.getItem('profile-wyy'))
        return JSON.parse(window.localStorage.getItem('profile-wyy')).backgroundUrl
      }else{
          return 'http://p2.music.126.net/0-wofKUzaTVK4Zn9TP_T7w==/109951165123392753.jpg'
      }
      
    },
    avatarUrl(){
      if(this.isLogin){
        return this.profile.avatarUrl
      }  
    },
    nickname(){
       return this.profile.nickname || "登录立享手机电脑多端同步"
    },
    uid(){
       return this.profile.userId
    }
  },
  beforeDestroy(){
    this.$store.commit('setBcgray')
  }
}
  
</script>


<style scoped>
.mine-bc{
  background-image: url("https://p2.music.126.net/AUi2xcoEn2sjLdFQmdQl4A==/109951164739702709.jpg");
  height: 45vh;
  width: 100%;
  /* filter: blur(100px); */
  background-size: 100% 100%;
  position: absolute;
  z-index: -1;
}
.login-content{
  width: 90vw;
  height: 30vh;
  color:white;
  margin-top: 70px;
  /* background-color: red; */
  margin: 0 auto;
  position: relative;
  top: 10vh;
  /* z-index: 999; */
}
.login-content .avtor{
  width: 100%;
  height: 50%;
  /* background-color: #fff; */
  display: flex;
  align-items:center;
  justify-content: space-around;
  color: white;
  font-size: 10px;
}
.mine-avtor{
  display: inline-block;
  flex:0 0 16%;
  padding-top: 16%;
  background-color:yellow;
  border-radius: 50%;
  margin: 0 5px;
}

.des-login{
  flex:0 0 60%;
}
.btn-login{
  display: inline-block;
  flex:0 0 24%;
  height: 20px;
  text-align: center;
  line-height: 20px; 
  position: relative;
}
.btn-login::after{
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 40px;
  border:1px solid white;
  transform: scale(.5);
  border-radius: 20px;

}
.list-cz{
  display: flex;
  height: 50%;
  text-align: center;
  padding-top: 20px;
}
.cz-item{
  flex: 1;
}
.cz-item i{
  display: block;
  font-size: 25px;  
}
.cz-item span{
  display: block;
  margin-top: 5px;
  font-size: 10px; 
}
.mine-music{
  background-color: #fff;
  margin-top: 70px;
  border-radius: 15px 15px 0 0;
}
.my-music{
  padding:15px;
}
.my-music-content{
  background-color: #fff;
  display: flex;
  margin:0 15px;
  justify-content: space-between;
  
}
.my-music-item{
  flex: 0 0 32%;
  padding-top: 45%;
  background-image: url('http://p2.music.126.net/0-wofKUzaTVK4Zn9TP_T7w==/109951165123392753.jpg');
  background-size: 100% 100%;
  border-radius: 5px;
  position: relative;
  text-align: center;
}
.my-music-item:nth-child(2){
   background-image: url('https://p2.music.126.net/KVH-zubyuZG6SV2LirmXwA==/1396379773411552.jpg');
}
.m-m-i-c{
  position: absolute;
  left: 0;
  top: 25%;
  color: white;
  /* background-color: #fff; */
  height: 75%;
  width: 100%;
  font-size: 14px;
  text-align: center;
    
}
.my-music-item .iconfont{
  font-size: 35px;
  top: 0;
  left:50%;
  color: red;
  transform: translateX(-50%);  
}

.m-m-i-c .heartmode{
  position: relative;
  width: 90px;
  height: 20px;
  top: 20%;
  margin: 0 auto;  
}
.m-m-i-c .heart-mode::after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 20px;
  background-color: #fff;
  opacity: .6;
  border-radius: 10px;
}
.rec-music{
  padding: 20px 15px 15px 15px;
}
.rec-music span:nth-child(2){
  font-size: 10px;
  color: gray;
  float: right;
}  
.rec-songlist{
  margin: 0 15px;
  height: 65px;
  display: flex;
  justify-content: space-between;
}
.rec-songlist-item{
  flex: 0 0 49%;
  background-color: red;
}
.rec-songlist-item .songlist-img{
  width: 65px;
  height: 65px;
  background-image: url("http://p1.music.126.net/qMWQ89N6VIc6QNp2q5XTFg==/109951164715199396.jpg");
  background-size: 100% 100%;
  border-radius: 7px;
}
</style>