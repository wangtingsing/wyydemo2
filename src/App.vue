<template>
  <div id="app">
    <topnav v-if="!$store.state.topisshow"></topnav>
    <keep-alive :include="cached"><router-view/></keep-alive>
    <!-- <router-view/> -->
  
   
    <footerplay class="footer-play" v-show="$store.state.isfooterplay"></footerplay>
    <songaudio/>
  </div>
</template>



<script>

import topnav from '@/components/topnav.vue'
import songaudio from '@/components/audio'
import { mapState} from 'vuex'
// 底部播放组件
import footerplay from '@/components/footerplay'
export default {
  name: 'App',
   data () {
    return {
     
    }
  },
  components:{
    topnav,
    footerplay,
    songaudio

  },
  created: function(){
   
  },
  computed:{
     ...mapState({cached:'cached'})
  },
  methods:{
   
  }
  
}
</script>

<style>
/* @import 'assets/css/coverelement.css'; */
</style>
