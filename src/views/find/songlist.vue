<template>
  <div class="song-list-body" ref="slb">
      <div class="nav-bac"></div>
      <div class="nav" :class="{'cover':iscover}">
         <anttop>
          <div slot="center">
              <span>歌单</span>
              <router-link to="/search">
                <span class="search"><i class="iconfont icon-sousuo" ></i></span>
              </router-link> 
              
          </div>
          <div slot="right">
            <span class="search"><i class="iconfont icon-diandiandian"></i></span>
          </div>
         </anttop>
      </div>
      <div class="singlist-body-copy" v-if="isshow">
          <div class="songlist songlist-copy" >
            <div class="songlist-mess">
              <span>
                  <i class="el-icon-video-play"></i>
              </span>
              <span class="playall">播放全部</span><span class="songcount">(共{{trackCount}}首)</span>
              
              <span class="collect collect-copy">+ 收藏({{subscribedCount}})</span>
            </div>
      </div>
      </div>
      
     
      <div class="bac-bur" :style="{backgroundImage: 'url(' + coverImgUrl + ')' }"></div>
      <div class="top-message">
        <div class="top-title">
            <div class="cover-img"><img :src="coverImgUrl" alt=""></div>
            <div class="song-name">
               <div class="songlist-name">{{songlistname}}</div>
               <div class="avatarUrldiv">
                   <img :src="avatarUrl" alt="">
                   <span class="creator-name">{{nickname}}></span>
               </div>
               <div class="desc">{{description}}</div>   
            </div>
        </div>
        
        <div class="footer-list">
          <div class="itemicon"><span><i class="iconfont icon-pinglunliebiao"></i></span><div class="itemdesc">{{commentCount}}</div></div>
          <div class="itemicon"><span><i class="iconfont icon-fenxiangdaozhuanfafasongzhiyuanquanxianxing"></i><div class="itemdesc">{{shareCount}}</div></span></div>
          <div class="itemicon"><span><i class="iconfont icon-xiazainor"></i></span><div class="itemdesc">下载</div></div>
          <div class="itemicon"><span><i class="iconfont icon-duoxuan"></i></span><div class="itemdesc">多选</div></div>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="songlist-body">
          <div class="songlist">
            <div class="songlist-mess">
              <span>
                  <i class="el-icon-video-play"></i>
              </span>
              <span class="playall">播放全部</span><span class="songcount">(共{{trackCount}}首)</span>
              
              <span class="collect">+ 收藏({{subscribedCount}})</span>
            </div>
          </div>
          <songlistItem :tracks='tracks' :like="like"></songlistItem>
          <!-- 列表 -->
          <!-- <div class="songlist-content">
              <ul>
                  <li v-for="(item,index) in tracks" :key=index @click="goplay(item.id,index)">
                      <div class="songindex">{{index+1}}</div>
                      <div class="songname">
                          <div class="play-name">{{item.name}}</div>
                          <div class="songer">{{item.ar[0].name}} - {{item.al.name}}</div>
                      </div>
                      <div class="more"><span><i class="iconfont icon-diandiandian"></i></span></div>
                  </li>
              </ul>
          </div> -->
      </div>
      
  </div>
</template>

<script> 
import anttop from '@/components/header'
import {getsonglist} from '@/request/find.js'
import {likelist} from '@/request/myrequest.js'
import songlistItem from '@/components/songlistItem'
import { mapState} from 'vuex'

export default {
  name: 'songlist',
 
  data () {
    return {
      songlistname:'',
      coverImgUrl:'',
      songlistname:'',
      avatarUrl:'',
      nickname:'',
      description:'',
      commentCount:'',
      shareCount:'',
      trackCount:'',
      subscribedCount:'',
      isshow:false,
      iscover:false,
      like:false//是喜欢音乐的页面

    }
    
  },
  computed:{
    ...mapState({tracks:'tracks'})//数组形式怎么不可以 
  },
  components:{
    anttop,   
    songlistItem
  },
  beforeCreate(){
    if(this.$route.params.uid){
      this.like = true
    }
  },
  created:function(){
    if(!this.like){
      getsonglist(this.$route.params.id).then(res=>{
        console.log(res.data)
        this.songlistname = res.data.playlist.name;
        this.commentCount = res.data.playlist.commentCount;
        this.trackCount = res.data.playlist.trackCount;
        this.shareCount = res.data.playlist.shareCount;
        this.subscribedCount = res.data.playlist.subscribedCount;
        this.description = res.data.playlist.description;
        this.coverImgUrl = res.data.playlist.coverImgUrl;
        this.avatarUrl = res.data.playlist.creator.avatarUrl;
        this.nickname = res.data.playlist.creator.nickname;
        let track = res.data.playlist.tracks;
        
        let tracks = track.concat(track)
        this.$store.commit('setTracks',tracks);
          
    })
    }else{
      likelist(this.$route.params.uid).then(res=>{
        console.log(res.data)
      })
    }
    
  },
  watch:{
      sindex:function(){
    
          if(this.sindex>this.tracks.length){
            this.sindex=0
        
          this.goplay(this.tracks[this.sindex].id,this.sindex)
          }
         
      }
  },
  mounted: function() {
     
    // let slb = this.$refs.slb
    //  console.log(this)
    window.addEventListener("scroll", this.handleScroll,true);
    if(this.$route.params){
      window.scrollTo(0,0)
    }
    // console.log(this.$route)
    // this.$eventbus.$on('endnext', function (index) {
    //     //index+1 下一首歌
    //     if(index<this.tracks.length-1){
    //         let updateindex = index+1
    //     }else{
    //          let updateindex = 0
    //     }
    //     this.goplay(tracks[updateindex].id,updateindex)
    // })
  },
  methods:{
      handleScroll:function(){
        if(document.documentElement.scrollTop>232){
            this.isshow = true
            this.iscover = true

        }else if(document.documentElement.scrollTop<232){
            
            console.log(document.documentElement.scrollTop)
            this.isshow = false
            this.iscover = false
        }
      },
        goplay: function(songid,index){
            console.log('================songlusy==========================')
            console.log(songid)
            // togglefooter事件  显示底部播放组件
           this.$store.commit('togglefooter',songid);
           this.$store.commit('updateIndex',index);

       },
  },
//   beforeRouteEnter:function(to,from,next){
//       window.removeEventListener("scroll", this.handleScroll)
//       next()
//   }
  beforeRouteLeave:function(to,from,next){
     
    //   window.removeEventListener("scroll", this.handleScroll)
  
     console.log(to)
      next()
  },
  beforeDestroy(){
      console.log("ghjkl")
  window.removeEventListener("scroll", this.handleScroll,true)

},
        destroyed(){
          console.log("xiaohi")
        //   window.removeEventListener("scroll", this.handleScroll)
        
        }

}</script>


<style scoped>
/* ------------------底部播放----------------------- */

/* ------------------底部播放----------------------- */
.song-list-body{
    position: relative;
}
    .nav{
        color: white;
        position: fixed;  
        top: 0px;
        left: 0; 
        width: 100%;
        z-index: 999;
    
        
    } 
    .cover{
        background-color: black;
       
    } 
    .nav-bac {
        width: 100%;
        height: 55px;
        background-color: gray;
        opacity: 0.1;
        position: fixed;
        top: 0;
        left: 0; 
        z-index: 99;
    }
    .singlist-body-copy {
        background-color: #fff;
        border-radius: 15px 15px 0 0;
        width: 100%;
        height: 41px;
        position: fixed;
        top:55px;
        left: 0;
    }
    .icon-sousuo {
      margin-left: 70%;
      font-size: 1.2em;
      color: cornsilk;
   }
    .right span{
      margin-left: 25%;

    }
    .icon-diandiandian {
      text-align: center;
      
    }
    .top-message{
       color: wheat;
       width: 90%;
       margin: 0 auto;
       /* height: 400px; */
       overflow: hidden;
       
    }
    .bac-bur {
        position: fixed;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        height: 300px;
        background-position: center top;
        background-size: 100%;
        background-attachment: fixed;
        filter: blur(30px);
    }
    .top-title {
        display: flex;
        margin-top: 75px;
    }
    .cover-img{
        flex:0 0 45%;
        /* background-color: red; */
    }
    .cover-img img{
        width:90%;
        border-radius: 10px;
    }
    .song-name{
        flex:0 0 55%;
        height: 132px;
         /* background-color: yellowgreen; */
         vertical-align: middle;
         overflow: hidden;
        
    }
    .top-title .avatarUrldiv{
        margin-top: 6px;
    }
    .top-title .avatarUrldiv img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align:middle;
        
    }
    .top-title .creator-name{
        font-size: 10px;
        line-height: 50px;
        vertical-align:middle;
        margin-left: 5px;
        
    }
    .top-title .desc{
        font-size: 10px;
    }
    .footer-list{
        display: flex;
        margin-top: 20px;
        justify-content: space-around;
        
    }
    .footer-list .itemdesc{
        font-size: 10px;
    }
    .itemicon{
        flex: 0 0 20%;
        text-align: center;
        padding: 0 5px 0 5px;
        
        
    }
    .itemicon .iconfont{
        font-size: 1.5em;
    }
    .songlist-body{
        background-color: #fff;
        border-radius: 15px 15px 0 0;
        /* position: relative; */
    }
    
    .songlist{
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        line-height: 40px;
    }
    .songlist-copy{
       position: fixed;
       top:55px;
       left: 0;
       width: 90%;
       margin-left: 5%;
       margin-top: 0px;

    }
    .collect-copy{
        right: auto;
    }
    .el-icon-video-play{
        font-size: 1.2em;
    }

    .songlist .songcount{
       font-size: 10px;
       color:#969292;
   }
    .songlist .playall{
       margin-left: 2%;
   }
    .songlist .collect{
      color: white;
      /* display: inline-block; */
      width: 30%;
      height: 32px;
      margin-top: 4px;
      font-size: 11px;
      background-color: red;
      border-radius: 15px;
      float: right;
      line-height: 32px;
      text-align: center;
      
   }
   .songlist-content ul{
       width:90%;
       margin-left: 5%;
       margin-bottom: 40px;
       
       
       
   }
   .songlist-content ul li{
       width:100%;
       height: 55px;
       display: flex;
       /* justify-content: space-between; */

   }
   .songlist-content .songindex {
       text-align: left;
       flex: 0 0 10%;
       color: #969292;
       
   }
   .songlist-content .songname {
        flex: 0 0 75%;
   }  
   .songlist-content .more {
       text-align: right;
       flex: 0 0 15%;
       color: #969292;
      
   }
   .songlist-content .songname .play-name{
       font-size: 16px;
   }
   .songlist-content .songname .songer{
       font-size: 8px;
       color:#969292;
      
   }

   
</style>