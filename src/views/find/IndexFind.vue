<template>
  <div class="indexpage">
    <!-- 轮播 -->
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in banners" :key="item.pic">
          <!-- <h3 class="small" :src="item.pic">{{ item.pic}}</h3> -->
          <img :src="item.pic" alt="" class="imgbanner">
          <!-- 独家 直播 -->
          <!-- <span>{{item.typeTitle}}</span> -->
        </el-carousel-item>
      </el-carousel>
    </div>
  <!--每日推荐,歌单，排行榜等  -->
    <div class="songlist clearfix">
      <ul class='clearfix'>
        <li v-for="(item,index) in imgList" :key="index">
          <img :src="item.src" alt="">
        </li>
      </ul> 
    </div>
    <!--推荐 -->
    <div class="hot">
      <div class="hot-title">
        推荐歌单
      </div>
      <div class=rec-list>
        <ul>
          <li v-for="(item,index) in songlist" :key=index>
            <router-link :to="{name: 'songlist', params:{id:item.id}}">
              <img class="item-img" :src="item.picUrl"/>
              <span class="item-span">{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
       
    </div>
  </div>
</template>

<script>
import {getBanner,personalized,searchDefaultKeys} from '@/request/find.js'
export default {
  name: 'IndexFind',
  data () {
    return {
      banners:'',
      imgList: [{
        src: require('@/assets/img/IMG_7018_01.jpg'),
        path: ''
      }, {
        src: require('@/assets/img/IMG_7018_02.jpg'),
        path: ''
      }, {
        src: require('@/assets/img/IMG_7018_03.jpg'),
        path: ''
      }, {
        src: require('@/assets/img/IMG_7018_04.jpg'),
        path: ''
      }, {
        src: require('@/assets/img/IMG_7018_05.jpg'),
        path: ''
      }],
      songlist:'',

    } 
  },
  created(){
    console.log('find')
    getBanner().then(res=>{
      this.banners = res.data.banners
      // console.log(res.data.banners)
    })
    personalized().then(res=>{
      this.songlist = res.data.result
      console.log(res)
    })
    //
  },
  mounted(){
    console.log(this)
  },
  
  methods:{
    
  }
}
</script>


<style scoped>
    .indexpage{
      margin: 0 15px;
      padding-top: 45px;
      overflow: hidden;
    }
    .block{
      margin-top: 10px;
    }
    .indexpage .imgbanner{
      width: 100%;
      height: 150px;
      border-radius: 5px;
    }
    .el-carousel__button{
      width: 3px;
      height: 3px;
      border-radius: 50%;
    }
    .songlist{
      margin-top: 15px;
    }
    .songlist li{
      width: 20%;
    }
    .songlist li img{
      width: 100%;
      /* height: 100%; */
    }
    /* 歌单 */
    .hot-title{
      margin-top: 4px;
      font-size: 1.2em;
      font-weight: 600;
      height:12vw

    }
    .rec-list ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content:space-between;

    }
     .rec-list ul li{
       flex: 0 0 30%;
       margin-bottom: 5%;
      
     }
     .rec-list .item-img{
       width: 100%;
       align-content: center;
       border-radius: 5px;
     }
      .rec-list .item-span{
        color: rgb(80, 80, 80);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-decoration: brown;
      }
      a {
        text-decoration: none;
        color: black;
      }


</style>