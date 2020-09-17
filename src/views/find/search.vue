<template>
  <div class="search-item">
      <div class="backcolor"></div>
      <div class="headerc">
          <anttop>
            <div class='serchInput' slot="center"><el-input v-model="keywords" :placeholder="placeholder"></el-input></div>
            <div class='selectsongers' slot="right"><span><i class="iconfont icon-haoyou"></i></span></div>
          </anttop>
      </div>
      <div class="hotsearch">热搜榜</div>
      <div class="song-content"><songlistItem :tracks="hotlist"></songlistItem></div>
      
      
      <!-- 搜索结果 -->
      <div class="search-result" v-if="searchresult">
        <div class="search-type">
          <ul>
            <ul>
              <li v-for="(item,index) in lrcArr" :key=index>{{item}}</li>
            </ul>
          </ul>
        </div>
        <div class="content-res"></div>
      </div>
  </div>
</template>

<script>
import anttop from '@/components/header'
import songlistItem from '@/components/songlistItem'
import {debounce} from '@/utils/utils.js'
import {searchDefaultKeys,hotlist,suggest,multimatch} from '@/request/find.js'

export default {
  name: 'search',
  data () {
    return {
        keywords:'',
        // timer:null
        tracks:[],
        placeholder:'',
        hotlist:[],
        typeSearch:["综合","单曲","云村","视频","歌手","专辑","歌单","主播电台","用户"],
        searchresult:false
        
    }
  },
  
  created:function(){
      searchDefaultKeys().then(res=>{
        //   console.log(res)
        this.placeholder = res.data.data.showKeyword
      })
      hotlist().then(res=>{
           console.log(res.data.data)
        this.hotlist = res.data.data
      })

  },
  watch:{
      keywords: function (str) {
        if (typeof str ==='string'){
            if (str.trim().length!=0){
                this.debounce(this.changeStr,1000);
            }else {}
        }
    }
  },
  components:{
     anttop,
     songlistItem
 
  },
  methods:{
   debounce:function(fn,wait){
        if (this.fun!==null){
            clearTimeout(this.fun)
        }
        this.fun = setTimeout(fn,wait)
    },
    changeStr:function(){
      if(this.keywords.length!=0){
        suggest(this.keywords).then(res=>{
         console.log(res)
       })
      }
       
    }
    }
  
}
</script>


<style scoped>
.search-item{
  overflow: hidden;
}
   .backcolor{
       position: fixed;
       height: 55px;
       width: 100%;
       top: 0;
       left: 0;
       background-color:rgb(218,217,216);
       /* opacity: .1 */
   }
   .serchInput{
       width:100%;
       position: relative;
       top: -7.5px;
       left:-8%;
      
   }
   .headerc{
     position: fixed;
     width: 100%;
     height: 55px;
     /* margin-top: 14px; */

   }
   .headerc .left{
        padding: 5px 0 0;
       font-size: 1.5em;
   }
   .icon-haoyou{
       font-size: 1.5em;
       color:white;
   }
   .hotsearch{
       margin-top: 70px;
       margin-left: 15px;
   }
   .song-content{
     margin-top:-25px;
   }
   .el-input__inner:focus{
     border:none
   }
</style>