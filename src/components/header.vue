<template id="topslot">
  <div class="top">
    <div class="left"  @click='$router.go(-1)'><span><i class="iconfont icon-fanhui"></i></span></div>
    <div class="center"><slot  name="center" ></slot></div>
    <div class="right"><slot  name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'topslot',
  data () {
    return {
    
    }
  }
}
</script>


<style scoped>
   .top {
       height: 40px;
       display: flex;
       margin-top: 15px;
   }
   .left {
       color: rgb(243,243,243);
       flex: 0 0 16%;
       /* background-color: chartreuse; */
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
   .right {
       flex: 0 0 16%;
       /* background-color: chartreuse; */
   }

</style>