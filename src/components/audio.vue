<template>
  <div class="song-audio" :data-test='ispause'>
    <audio :src="surl" controls="controls"  id="player" ref="audioitem" autoplay='autoplay' @timeupdate="timeupdate" @canplay="startPlay" @ended="ended">
      <!--（1）属性：controls，preload（2）事件：canplay，timeupdate，ended（3）方法：play()，pause() -->
      <!--controls：向用户显示音频控件（播放/暂停/进度条/音量）-->
      <!--preload：属性规定是否在页面加载后载入音频-->
      <!--canplay：当音频/视频处于加载过程中时，会发生的事件-->
      <!--timeupdate：当目前的播放位置已更改时-->
      <!--ended：当目前的播放列表已结束时-->
    </audio>
  </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'song-audio',
  data(){
      return{
       
      }
  },
  computed:{
    ...mapState({sindex:'sindex',surl:'surl',ispause:'ispause',updateTime:'updateTime',moveflag:'moveflag',curflag:'curflag',preNext:'preNext'}),//数组形式怎么不可以 
  },
  // props:{
  //     songsrc:String,
  //     ispause:Boolean
  // },
  
  created(){
    
  },
  mounted(){
      let player = this.$refs.audioitem
      this.$store.commit('setCurTime', player.currentTime)
  },
  watch:{
      ispause:function(){
          let player = this.$refs.audioitem
          if(!this.ispause){
              player.pause()
          }else{
              player.play()
          }
      },
      curflag:function(){
      console.log("监听updateTime--------"+this.updateTime)
      let player = this.$refs.audioitem
      player.currentTime = this.updateTime
      console.log(player.currentTime)
       this.$store.commit('setCurflag',0)//改变flag  通知

    },
    

  },
  
  
  methods: {
    //播放结束 触发下一首
      ended(){
        console.log('jieshu')    
        this.$store.commit('updateIndex',this.sindex+1);
      },
      timeupdate () {
        let player = this.$refs.audioitem
        this.$store.commit('setCurTime', player.currentTime)
      },
       // 获取歌曲链接后准备播放
      startPlay () {
        let player = this.$refs.audioitem
        this.$store.commit('setDuration', player.duration)
        //  开始播放
        // player.play()
        // this.$store.commit('setIsPlay', true)
      },
      

  }
    
}
</script>

<style>
  #player {
    display: none;
  }

</style>
