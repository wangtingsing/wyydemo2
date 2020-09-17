<template>
  <div class="playerdetail">
 <div class="bc" :style="{backgroundImage: 'url(' + spic + ')' }"></div>
      <!-- <anttop>
      
      <div slot="center">
        <div class="songname">{{songname}}</div>
        <div class="songer">{{songer}}</div>
      </div>
      <div slot="right">
        <span class="fenxiang"><i class="iconfont icon-fenxiangdaozhuanfafasongzhiyuanquanxianxing"></i></span>
      </div>
    </anttop> -->
    <div class="top-bc"></div>
    <div class="play-top">
       <div class="left"  @click='goSonglist'><span><i class="iconfont icon-fanhui"></i></span></div>
       <div class="center">
        <div class="songname"><ul>
          <li>{{songname}}</li>
          <li>{{songname}}</li>
        </ul></div>
        <div class="songer">{{songer}}</div>
      </div>
      <div class="right">
        <span class="fenxiang"><i class="iconfont icon-fenxiangdaozhuanfafasongzhiyuanquanxianxing"></i></span>
      </div>
    </div>
   
    <div v-show="!toggleIrc" @click="toggleSongIrc" class="playerImg" :class="{'anmaitionPlay':!ispause}" :style="{backgroundImage: 'url(' + playerImg + ')' }">
      <img :src="spic" alt="">
    </div>
    <div v-show="toggleIrc" @click="toggleSongIrc" class="songIrc" >
    
      <ul ref="lyricMove">
        <li v-for="(item,index) in lrcArr" :key=index :class="{'highlight':index==currentRow}">{{item.text}}</li>
      </ul>
    </div>  
  <!-- 底部进度条与播放控制 -->
  <div class="play-footer">
    <div class="play-process">
      <div class="update-time">{{updateTimeFormate}}</div>
      <div class="process" ref="process"><span class="curprocess" :style="{width: curLength+'%'}"></span><span :class="{'movebig':bigflag}" class="dot-time" :style="{left: curLength+'%'}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></span></div>
      <div class="total-time">{{durationFormate}}</div>
    </div>
    <div class="pre-next">
      <div class="control-play"><span><i class="iconfont icon-liebiaoxunhuan"></i></span></div>
      <div class="control-play"><span @click="togglesong(-1)"><i class="iconfont icon-shangyishou"></i></span></div>
      <div class="control-play"><span @click="togglepause"><i class="el-icon-video-play" :class="{'el-icon-video-pause':ispause}"></i></span></div>
      <div class="control-play"><span @click="togglesong(1)"><i class="iconfont icon-xiayishou"></i></span></div>
      <div class="control-play"><span><i class="iconfont icon-liebiao"></i></span></div>
    </div>
  </div>
  </div>
</template>

<script>
import anttop from '@/components/header'
import { mapState} from 'vuex'
import {formatSeconds} from '@/utils/utils'
import {getLyric} from '@/request/find.js'
import {formatLyric} from '@/utils/utils.js'
export default {
  name: 'player',
  data () {
    return {
     playerImg:require('@/assets/img/player/png/cover-bg-in.png'),
     curLength:0, //进度条位置（播放进度）
     bigflag:false,//控制圆点动画
     toggleIrc:false,//歌词显示
     lrcArr:[],//歌词
     currentRow:0
    }
  },

  computed:{
    ...mapState({songname:'songname',songer:'songer',spic:'spic',updateTime:'updateTime',duration:'duration',moveflag:'moveflag',curflag:'curflag',ispause:'ispause',sid:'sid',sindex:'sindex',tracks:'tracks'}),
    updateTimeFormate(){
      return formatSeconds(this.updateTime)
    },
    durationFormate(){
      return formatSeconds(this.duration)
    },
    // songname(){
    //   return this.$route.params.songname   
    // },
    // songer(){
    //   return this.$route.params.songer   
    // },
    // spic(){
    //   return this.$route.params.spic   
    // }
  },
  watch:{
    // sindex:function(){
    //       console.log('-------====++++')
    //       console.log(this.sindex)
       
    //         if(this.sindex>this.tracks.length){
    //         this.sindex=0
    //         }
    //       this.goplay(this.tracks[this.sindex].id,this.sindex)     
    //   },
    sid:function(){
      getLyric(this.sid).then(res=>{
        console.log("歌詞")
      this.lrcArr = formatLyric(res.data.lrc.lyric)
    })  
     this.$store.commit("togglefooter",{'flag':false})//改變sid=>切換歌曲了 切換時到player頁相對於點擊了footer 所以再footer影藏
    },
    
    updateTime(){
      if(this.moveflag!=1){
          let lyricMove = this.$refs.lyricMove
          let top = 0
          this.curLength = (this.updateTime/ this.duration) * 100 // 改变进度条位置
          if(this.toggleIrc){
            this.lrcArr.forEach((element, index) => {
            if (parseInt(this.updateTime) == element.time) {
              // top = -index * 21
              // if(top>200){
                  lyricMove.style.top = -index * 41+100+ "px";
              // }
              // 
              this.currentRow = index; //通过比较歌词属性里的时间与当前播放时间，来定位到该歌词
            }
          });
          }
          
      }
    }
  },
  created(){
   
       getLyric(this.sid).then(res=>{
      this.lrcArr = formatLyric(res.data.lrc.lyric)
    })  
  },
  mounted(){
    window.scrollTo(0,0)
  },
  updated(){
   
  },
  components:{
    anttop
  },

  methods:{
    // goplay: function(songid,index){
    //         console.log(songid)
    //         // togglefooter事件  显示底部播放组件
    //        this.$store.commit('togglefooter',{'songid':songid,'flag':false});//false作為標識，有歌單列表頁切換歌曲 footer不切換  其他情況（player<->songlist）切換
    //        this.$store.commit('updateIndex',index);

    //    } ,
    togglesong(val){
      // this.$store.commit('setPerNext',val);
      this.$store.commit('updateIndex',this.sindex+val);
    },
    toggleSongIrc(){
      
      this.toggleIrc = !this.toggleIrc

    },
    touchstart(){

    },
    goSonglist(){
      this.$router.go(-1)
      
      this.$store.commit('togglefooter',{'songid':this.sid,'flag':true})
    },
    touchmove(e){
      this.$store.commit('setMoveflag',1)//改变flag  通知
      this.bigflag = true;
      let processL = this.$refs.process.offsetLeft //进度条距离左侧边界的距离
      let processW = this.$refs.process.clientWidth
      let movementX = e.touches[0].pageX //移动过程距离左侧边界长度
      let nowcurLength = movementX-processL
      console.log(nowcurLength,processW)
      this.curLength = nowcurLength/processW*100
      console.log(this.curLength)
    },
    touchend(e){
       this.$store.commit('setCurflag',1)//改变flag  通知
        this.$store.commit('setMoveflag',0)
        this.bigflag = false;
      let newupdateTime = this.$store.state.duration*this.curLength/100
      console.log('=========结束歌曲的长度========'+newupdateTime)
      this.changeTime(newupdateTime)
    },
    // 更改歌曲进度
    changeTime (time) {   
      this.$store.commit('setChangeTime', time)
    },
     togglepause(){
          this.$store.commit("togglePause")
          this.playFlag = !this.playFlag
        //   this.ispause = !this.ispause
        //   console.log(this.ispause)

      }
  
      
  }
}
</script>


<style scoped>
.playerdetail{
  width: 100vw;
  height: 100vh;

  position: relative;
}
 .bc{
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background-position: center top;
  background-size: 100%;
  background-attachment: fixed;
  filter: blur(100px);       
          
 } 
 .top-bc{
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: black;
  opacity: .9;
  z-index: -999;
  filter: blur(100px)
   
 }
 .play-top{
   height: 55px;
   display: flex;
   color: white;
   align-items: center;    
   

 }
 .left {
       flex: 0 0 16%;
       margin-left: 15px;
      
   }
   .left .icon-fanhui {
        font-size: 1.2em;
        /* font-color:#ffffff; */
   }
   .center {
          flex: 0 0 68%;
       /* background-color: red; */
   }
   .center .songname{
     overflow: hidden;
     height: 20px;
   }
   .songname ul{
     width: 200%;
     animation: moveleft 5s linear infinite;
   }
    .songname ul li{
     width: 50%;
   } 
   
   @keyframes moveleft {
     /* 字体模糊 */
        /* 0% {transform: translateX(0%)}
        
        50% { transform: translateX(-20%);}
       
        100% {transform: translateX(-50%);} */
        /* 100%{margin-left:0px} */
        0%{margin-left:0px}
        50%{margin-left:-50%}
        100%{margin-left:-100%}
    }
   .center .songer{
     font-size: 10px;
   }

   .right {
       flex: 0 0 16%;
       /* background-color: chartreuse; */
   }
  .songIrc{
    width: 70vw;
    height: 55vh;
    margin: 5vh auto;
    overflow: hidden;
    position: relative;
    color: #B3B3B3;
  }
  .songIrc ul{
    width: 100%;
    position: absolute;
    transition: top 1.5s;
  }
  .songIrc ul li{
    
    width: 100%;
    float: left;
    margin: 10px 0;
    text-align: center;
  }
  .highlight{
    /* color: yellow; */
    color: white;
  }
 .playerImg{
   width: 70vw;
   height: 70vw;
   margin: 15vh auto;
   background-size:100% 100%;
   border-radius: 50%;
   animation: rotateimg 15s linear infinite;
 }
  .playerImg img{
    width: 73%;
    height: 73%;
    display: block;
    border-radius: 50%;  
    /* margin: 0; */
    position: relative;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
  @keyframes rotateimg {
        0% { transform: rotate(0deg);}
        
        50% { transform: rotate(180deg);}
       
        100% {transform: rotate(360deg);}
    }
    .anmaitionPlay{
      animation-play-state:paused;
    }
  .play-footer{
    position: absolute;
    bottom: 0;
    height: 130px;
  
    width: 100vw;
    /* background-color: red; */
  }
  .play-process{
    width: 100%;
    height: 20px;
    display: flex;
    font-size: 10px;
    color: #DDDDDD;
  }
  .update-time,.total-time{
    flex: 0 0 16%;
    /* background-color: green; */
    text-align: center;
    line-height: 20px;
  }
  
  .process{
    flex: auto;
    /* background-color: yellow; */
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background-color: #C4C4C4;
    margin-top: 8.5px;
    position: relative;
  }
  .dot-time{
    position: absolute;
    top: -1.5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: white;
  }
  .curprocess{
     position: absolute;
     display: inline-block;
     background-color: white;
     height: 3px;
     background-color: white;
  }
.movebig{
  transform: scale(2);
}
.pre-next{
  display: flex;
  justify-content: center;
  height: 50px;
  margin-top: 15px;
}
.control-play{
  flex: 1;
  color: #E6E6E6;
  font-size: 1.5em;
}
.control-play span i{
  display: block;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  font-size: 30px;
}
.pre-next .control-play:nth-child(3) i{
 font-size: 2em;
 transform: translate(-25%,-25%);
}
.pre-next .control-play:nth-child(5) i{
 font-size: 20px;
 margin-top: 7px;
}


</style>