var sss = "[华语速爆新歌] 最新华语音乐推荐最新华语音乐推荐"
function getsub(val){
    return val.match(/\[(\S*)\]/)[1];
}
var mmm = getsub(sss);
console.log(mmm)