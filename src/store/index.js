



import Vue from "vue"

import Vuex from "vuex"
 
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        // 顶部导航显示否
        topisshow: false,
        // 底部播放组件显示否
        isfooterplay:false,
        tracks:[],//歌曲數組
        // 歌曲id
        sid:'',
        sindex:0,// 歌曲的序号（数组中）
        surl:'',
        ispause: true, //是否歌曲暂停播放
        updateTime:0,//已经播放的时间
        duration:0,
        moveflag:0, //小圆点拖动 0未拖动  1 移动时候
        curflag:0, //拖动变化监听
        cached:[],//需缓存的组件
        bcgray:false,
        isLogin:false,
        account:'',
        profile:'',
        loginType:'',
        bindings:'',
        token:'',
        cookie:'',
        preNext:0,//上下首切換
        songname:'',
        songer:'',
        spic:''


    },
    getters:{

    },
    mutations:{

        // 更改surl
        newsurl: (state,surl)=>{
            console.log
            if(surl)
            state.surl = surl },
        // 切换歌曲播放暂停
        togglePause: (state)=>{ state.ispause = !state.ispause},
        toggletopT: (state)=>{state.topisshow = true},
        toggletopF:(state)=>{state.topisshow = false},
        togglefooter: (state,payload)=>{
           
                state.isfooterplay = payload.flag 
                console.log(state.isfooterplay) 
            
            state.sid = payload.songid || state.sid
            
        },
        updateIndex: (state,index)=>{
            state.sindex = index;
            console.log(state.sindex)
        },
        setCurTime: (state, curTime) => { state.updateTime = curTime },
        setDuration: (state, duration) => { state.duration = duration },
        setChangeTime: (state, updateTime) => { state.updateTime = updateTime },
        setMoveflag: (state,flag) => { state.moveflag = flag },
        setCurflag: (state,flag) => { state.curflag = flag},
        keepAlive:(state,component)=>{
            !state.catchList.includes(component)&&state.catchList.push(component)
        },
        setBcgray: (state) => { state.bcgray = !state.bcgray},
        setAccount(state,account) {
            window.localStorage.setItem('account-wyy',JSON.stringify(account))
            state.account = account
          },
          setProfile(state,profile) {
            window.localStorage.setItem('profile-wyy',JSON.stringify(profile))
            state.profile = profile
          },
          setLoginType(state,loginType) {
            window.localStorage.setItem('loginType',loginType)
            state.loginType = loginType
          },
          setBindings(state,bindings) {
            window.localStorage.setItem('bindings',JSON.stringify(bindings))
            state.bindings = bindings
          },
          setToken(state,token) {
            window.localStorage.setItem('token-wyy',token)
            state.token = token
          },
          setLogin(state){state.isLogin = true},
          setCookie(state,cookie) {
            window.localStorage.setItem('cookie-wyy',cookie)
            state.cookie = cookie
          },
          setTracks(state,tracks){state.tracks = tracks},
          setPerNext(state,val){
              state.preNext = val
              console.log(state.preNext)
        },
        setSongname(state,sn) { state.songname = sn},
        setSonger(state,sn) { state.songer = sn},
        setSpic(state,sn) { state.spic = sn},
        iskeepAlive(state,component){ !state.cached.includes(component) && state.cached.push(component)
        console.log('缓存的组件——————————————'+state.cached)
        },
        nokeepAlive(state,component){
            let index = state.cached.indexOf(component);
            console.log(index)
			index > -1 && state.cached.splice(index, 1);
        }
    },
    actions:{

    },
    modules:{
        
    }
})
export default store