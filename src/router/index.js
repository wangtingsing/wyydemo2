import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:"/find"
    },
    {
      path: '/mine',
      name: 'IndexMine',
      component: function (resolve) {
        require(['@/views/mine/IndexMine'], resolve)
      }
    },
    {
      path: '/find',
      name: 'IndexFind',
      component: function (resolve) {
        require(['@/views/find/IndexFind'], resolve)
          },
    },
    {
      path: '/player',
      name: 'player',
      component: function (resolve) {
        require(['@/views/find/player'], resolve)
          },
    },
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['@/views/login/login'], resolve)
          },
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: function (resolve) {
        require(['@/views/find/songlist'], resolve)
          },
    
    },
    {
      path: '/search',
      name: 'search',
      component: function (resolve) {
        require(['@/views/find/search'], resolve)
          },
    },
    {
      path: '/country',
      name: 'IndexCountry',
      component: function (resolve) {
        require(['@/views/country/IndexCountry'], resolve)
        }
    },
    {
      path: '/audio',
      name: 'IndexAudio',
      component: function (resolve) {
        require(['@/views/audio/IndexAudio'], resolve)
      }
    }
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(from)
  //   console.log(to)

  //   if(from.path=='/find'){
  //     return { x:0, y:0}
  //   }
  //   if(to.path=='/songlist'){
  //     console.log("songlist")
  //     return { x:1000, y:300}
    
    
  // }
    
  // }
})
 router.beforeEach((to, from, next) => {
    let gopath = to.path
    console.log()
    if(gopath=="/find"||gopath=="/mine"||gopath=="/country"||gopath=="/audio"){
      router.app.$options.store.commit("toggletopF")
     
    }else{
      router.app.$options.store.commit("toggletopT")
    }
     if(gopath=="/songlist"){router.app.$options.store.commit("iskeepAlive",'IndexFind')}
     if(gopath=="/player"){router.app.$options.store.commit("iskeepAlive",'songlist')}
     if(gopath=="/find"){router.app.$options.store.commit("nokeepAlive",'songlist')}

    next()
  })
  // if (to.meta.requireAuth) {
  //     //判断该路由是否需要登录权限
  //     if (cookies('token')) {
  //         //通过封装好的cookies读取token，如果存在，name接下一步如果不存在，那跳转回登录页
  //         next()//不要在next里面加"path:/",会陷入死循环
  //     }
  //     else {
  //         next({
  //             path: '/login',
  //             query: {redirect: to.fullPath}//将跳转的路由path作为参数，登录成功后跳转到该路由
  //         })
  //     }
  // }
  // else {
  //     next()
  // }

export default router
