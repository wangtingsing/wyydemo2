// 发现模块的所有网络请求
// 轮播
import {request} from '@/network/request.js'
export function getBanner(){
     return request({
        url:'/banner?type=2'
    })
}
// 推荐歌单
export function personalized(){
    return request({
        url:'/personalized'
    })
}
// 推荐歌单列表
export function getsonglist(id){
    const cookie =  window.localStorage.getItem('cookie-wyy')
    return request({
        method:'get',
        url:'/playlist/detail?id='+id+'&cookie='+cookie
    })
}
// 歌曲id获取详情
export function getdetailmusic(id){
    return request({
        method:'get',
        url:'/song/url?id='+id
    })
}
export function getsongpic(id){
    return request({
        method:'get',
        url:'/song/detail?ids='+id
    })
}
// export getmusicplay(id){
//     return request
// }
// 关键词搜索
export function searchKeys(keywords){
    if(keywords.length!=0){}
    return request({
        method:'get',
        url:'/search/suggest?keywords='+keywords+'&type=mobile'
    })
}
// 默认搜索
export function searchDefaultKeys(){
    return request({
        method:'get',
        url:'/search/default'
    })
}
//热搜列表
export function hotlist(){
    return request({
        method:'get',
        url:'/search/hot/detail'
    })
}
//歌词
export function getLyric(id){
    return request({
        method:'get',
        url:'/lyric?id='+id
    })
}
//搜索建议
export function suggest(key){
    return request({
        method:'get',
        url:'/search/suggest?keywords='+key
    })
}
// 搜索匹配
export function multimatch(key){
    return request({
        method:'get',
        url:'/search/multimatch?keywords='+key
    })
}
