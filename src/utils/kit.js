

var kit = {
	debounce: debounce,
	throttle: throttle,
  isEmpty: isEmpty,
  applyIf: applyIf,
  filterEmoj:filterEmoj,
  getParams: getParams,
  hideBtnOnInput: hideBtnOnInput
};

export default kit;



function getParams(){
   var url = window.location.search, strs;
   var theRequest = {};
   if (url.indexOf('?') != -1) {
      var str = url.substr(1);
      strs = str.split('&');
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
   }
   return theRequest;
}


function hideBtnOnInput(){
  var debounced = debounce(function(){  
    var winHeight = $(window).height();  
    $("body").height(winHeight);  
    var num = $(this).offset().top - 60;
    $("html,body").animate({scrollTop:num}, 100);
  }, 0);
  $(document.body).delegate('input','focus', debounced).delegate('input','blur', debounced);
}

function filterEmoj(jsonData){
  for(var key in jsonData) {
    if(typeof jsonData[key]==="string"){
      if(jsonData[key].match(/[^\u4e00-\u9fa5\{\}\[\]\/="'#<>《》【】()（）·●,.!?@\-_，。！？、……a-zA-Z\d]+/g)) {
        jsonData[key] = jsonData[key].replace(/[^\u4e00-\u9fa5\{\}\[\]\/="'#<>《》【】()（）·●,.!?@\-_，。！？、……a-zA-Z\d]+/g, "");
      }
    }
  }
  return jsonData;
}

function now(){
	return new Date().getTime();
}

function isEmpty(value){
  return typeof value === 'undefined' || value == null;
}

function debounce(func, wait, immediate) {

    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = now();
      var callNow = immediate && !timeout;

      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
 }

function throttle(){

}

//if target object didn't  have properties of source, set it
function applyIf(target, source){
  for(var key in source){
    if(!target.hasOwnProperty(key)){
      target[key] = source[key];
    }
  }
}

//if target object  have properties of source, set it
function applyExists(target, source){
  for(var key in source){
    if(target.hasOwnProperty(key)){
      target[key] = source[key];
    }
  }
}
