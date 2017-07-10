angular.module('app.filters', [])
.filter('appCurrencyFilter', function($filter) {
  return function(input, sign, symbol ,fractionSize) {
    if ("--" === input) {return "--"}
    input = input || '';
    symbol = symbol || '¥';
    fractionSize = fractionSize || 2;
    var out = '';
    if (sign) {
      if (Number(input)>0) {
        out+="+"+ symbol + ' ' + $filter('number')(input, fractionSize);
      }else if (Number(input)<0) {
        input*=-1;
        out+="-"+ symbol + ' ' + $filter('number')(input, fractionSize);
      }
    }else{
      out+= symbol + ' ' + $filter('number')(input, fractionSize);
    }
    return out;
  };
})
.filter('appDateFilter', function() {
  return function (date, bool , format) {
    date = new Date(date) || new Date();
    format = format || '-';
    bool = !!bool || false; //是否需要时分秒
    var out = "";
    if (angular.isDate(date)) {
      var year = date.getFullYear();
      var mon = 1 + date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      if (bool) {
        out += year + format + mon + format + day + " " + hour + format + min + format + sec;
      } else {
        out += year + format + mon + format + day;
      }
      // console.log(out);
      return out;
    }
  }
})
.filter("getFirstContent",function(){
  return function(input){
    input = input + '';
    return input.split(" ")[0]
  }
})
.filter('appDateTimeFilter', function() {
  return function (date, time) {
    date = new Date(date) || new Date();
    time = !!time ? time : 0; //0-24时
    var out = "";
    var hour = 0;
    var min = 0;
    var sec = 0;
    if (angular.isDate(date)) {
      var year = date.getFullYear();
      var mon = date.getMonth();
      var day = date.getDate();
    }
    switch (time) {
      case 0:
        hour = 0;
        break;
      case 24:
        hour = 23;
        min = 59;
        sec = 59;
        break;
      default :
        hour = time;
        break;
    }
    return new Date(year,mon,day,hour,min,sec);
  }
})

