
import {request} from '@/network/request.js'
// 手机登录
export function cellLogin(phone,phonepassword){
    return request({
        method:'get',
        url:'/login/cellphone?phone='+phone+'&password='+phonepassword
    })
}

export function likelist(uid){

    return request({
        method:'get',
        url:'/likelist?uid='+uid
    })
}
