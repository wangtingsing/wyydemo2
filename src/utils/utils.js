// 防抖
export function debounce1(fn,wait){
    var timer = null; 
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,wait)
        }    
    }
    function debounce_1(func,wait){
      let timeout
      return {
          function(){
              let args = [].slice.call(arguments);
              if(timeout) clearTimeout(timeout);
              let callNow = !timeout;
              timeout = setTimeout(()=>{
                  timeout = null;
              },wait) 
              if(callNow) fn.apply(this,args);
          }
      }
  }
function debounce_2(fn,wait){
      var timerId = null;
      var flag = true;
      return function(){
        clearTimeout(timerId);
        if(flag){
          fn.apply(this,arguments);
          flag = false
          }
        timerId = setTimeout(() => { flag = true},wait)
      }
    }
   
export function formatSeconds(time) {    
    let duration = parseInt(time);    
    let minute = parseInt(duration / 60);   
    let sec = duration % 60 + '';    
    let isM0 = ':';    
      if (minute == 0) {      
        minute = '00';    
      } else if (minute < 10) {     
        minute = '0' + minute;    
      }   
      if (sec.length == 1) { 
        sec = '0' + sec;    
      }   
      return minute + isM0 + sec  
      }
export function formatLyric(text) {
      let lyric=[];
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
          let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
          let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
          let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
          //再对剩下的歌词时间进行处理
          temp_arr.forEach(element => {
            let obj = {};
            let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
            let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
            obj.time = s;
            obj.text = text;
            lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里

          });
        }
        return lyric
      }

    
