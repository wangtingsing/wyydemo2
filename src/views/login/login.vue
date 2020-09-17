<template>
  <div class="top">
    <div class="bgcolor"></div>
     <div class="bgcolor_btn" v-show='btnClick'></div>
    <div class="logo-img" :style="{backgroundImage: 'url(' + logoimg + ')' }"></div>
    <div class="name-pass">
      <input type="number" name="phone" v-model="phone" placeholder="请输入手机号">
      <input type="text" name="password" v-model="password" placeholder="请输入密码">
      <button @click="getloginPass" ref="btn" v-loading.fullscreen.lock="fullscreenLoading">登录</button>
    </div>
  </div>
</template>

<script>
import { Message,Loading  } from 'element-ui';
import {cellLogin} from '@/request/myrequest.js'
import {debounce1} from '@/utils/utils.js'
export default {
  name: 'login',
  data () {
    return {
     logoimg:require('@/assets/img/slogan/logo.png'),
     phone:'',
     password:'',
     loading :false,
     fullscreenLoading: false,
     btnClick:false
     
    }
  },
  watch:{
  },
  methods:{
    getloginPass(){
      if(this.phone.length!=0||this.password.length!=0){
        this.btnClick = true
      }
      let btn = this.$refs.btn
      this.loginPass(btn)
      // btn.addEventListener('click',debounce1(this.loginPass,3000))
    },
    loginPass(btn){
      
      if(!this.completePhone()){
          this.warnmess("手机号格式有误")
          return
      }
      if(!this.completePass()){    
          this.warnmess("密码格式有误")
          return
      }
      this.fullscreenLoading = true;
      cellLogin(this.phone,this.password).then(res=>{
        this.fullscreenLoading = false
        
        console.log(res)
        let msg = res.data.msg||'登录成功'
        this.warnmess(msg)
         if(res.data.code === 200) {
           console.log(res)
            this.$store.commit('setAccount',res.data.account)
            this.$store.commit('setProfile',res.data.profile)
            this.$store.commit('setLoginType',res.data.loginType)
            this.$store.commit('setBindings',res.data.bindings)
            this.$store.commit('setToken',res.data.token)
            this.$store.commit('setCookie',res.data.cookie)
            this.$store.commit('setLogin')


            this.$router.push('/find')
         }

      })

    },
    completePhone(){
       console.log("phone")
      return /1[3,5,6,7,8,9]\d{9}/.test(this.phone)
      
    },
    completePass(){
       return /[(\.\*\!\@\#\$\%\^\&\(\)\-\+\=\|\[\]\{\};:,.<>\/\?~`)0-9a-z]/ig.test(this.password)
      console.log("pass")
    },
    warnmess(val){
       setTimeout(()=>{
          this.btnClick = false
        },2000)
       this.$message({
          showClose: false,
          center:true,
          iconClass:'',
          offset:'310',
          duration:2000,
          dangerouslyUseHTMLString:true,
          customClass:'customClasss',
          message:val,
         
        });   
    },
     openFullScreen2() {
        const loading = this.$loading({
          lock: false,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 重写警示样式 */
.el-message{
 min-width: 100px !important;
 width: 200px;
 max-width: 320px;
 background-color: black;
 border-radius: 30px;
 opacity: .4;
 color: white;
 /* width: 300px; */
}
/* ************************* */
    .bgcolor{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: #C10D0C;
        z-index: -9999;
    }
    .bgcolor_btn{
       position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
      background-color: black;
      opacity: .4;
      z-index: 99;
    }
    .logo-img{
      position: relative;
      top: 150px;
      width: 72px;
      height: 72px;
      margin: 0 auto;
      background-position: 436px 126px;

    }
    .name-pass{
      position: relative;
      top: 300px;
      width: 70vw;
      height: 162px;
      margin: 0 auto;
      position: relative;
    
    }
     .name-pass input{
     
       height: 44px;
       width: 100%;
       border-radius: 30px;
       border: 1px solid #c5c5c5;
       box-sizing: border-box;
       padding: 0 15px;
       margin-top: 10px;  
     }
      .name-pass input:focus{
        outline: none;
          font-size: 18px;
      }
      .name-pass button{
       position: absolute;
       left: 50%;
       bottom: 0;
       transform: translateX(-50%);
       width: 100%;
       height: 44px;
       text-align: center;
       border: none;
       border-radius: 30px;
       background-color: white;
       color: red;

      }
      .name-pass button:focus{
        outline: none;
       
      }
      
      .iconClass{
        width: 0;
      }
</style>