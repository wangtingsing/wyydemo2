<template>
    <div class="head" :class="{'bg-gray':bcgray}">
        <div class="item left-list">
            <span><i class="iconfont icon-liebiao"></i></span>
        </div>
        <div class="item center-list">
            <ul>
                <li v-for="(item,index) in list" :key="index"  :class="{'item-active':index === itemindex}" @click="goPage(item,index)">{{item.cname}}</li>  
            </ul> 
        </div>
        <div class="item right-search" @click="$router.push('/search')">
            <!-- <router-link to="/search"> -->
                <span class="search"><i class="iconfont icon-sousuo" ></i></span>
            <!-- </router-link>   -->
            
        </div>   
    </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
        itemindex:1,
        list:[
            {
                name:"mine",
                cname:"我的",
                path:"/mine"

            },
            {
                name:"find",
                cname:"发现",
                path:"/find"

            },
            {
                name:"country",
                cname:"云村",
                path:"/country"

            },
            {
                name:"audio",
                cname:"视频",
                path:"/audio"

            }
        ]
    }
  },
  computed:{
       ...mapState({bcgray:'bcgray'}),
  },
 
  methods:{
        goPage(val,index){
            this.$router.push({path: val.path})
            this.itemindex = index
        }
  }
}
</script>


<style scoped>
.head{
    color: #5a5a5a;
    position: fixed;
    background-color: white;
    z-index: 99;
    width: 100%;
    padding: 15px 0;
   
}
.bg-gray{
    background-color: rgba(0,0,0,.2);
    /* opacity: .2; */
    color: #B3B3B3;
    /* box-shadow: 0 0 5px 10px black; */
}
.bg-gray i{
    color: white;
}
.item{
    display: inline-block;
}
.left-list{
    width: 15%;
    color: black;
    text-align: center;
}
.right-search{
    width: 13%;
    float: right;
    color: black;
    text-align: center;
    
}
.center-list{
    width:70%;
}
.center-list ul{
    width:100%;
}
.center-list ul li{
    width:25%;
    text-align: center;

}
.icon-sousuo{
    font-size: 1.4em;
}
.item-active{
   
    color: red;
}

</style>
