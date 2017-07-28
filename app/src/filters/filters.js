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
.filter('add0before', function () {
  return function (input) {
    if (parseInt(input) < 10) {
      input = '0' + input;
    }
    return input;
  }
})
.filter('appDateFilter', function($filter) {
  return function (date, bool , format1, format2) {
    date = new Date(date) || new Date();
    format1 = format1 || '-';
    format2 = format2 || ':';
    bool = !!bool || false; //是否需要时分秒
    var out = "";
    if (angular.isDate(date)) {
      var year = date.getFullYear();
      var mon = $filter('add0before')(1 + date.getMonth());
      var day = $filter('add0before')(date.getDate());
      var hour = $filter('add0before')(date.getHours());
      var min = $filter('add0before')(date.getMinutes());
      var sec = $filter('add0before')(date.getSeconds());
      if (bool) {
        out += year + format1 + mon + format1 + day + " " + hour + format2 + min + format2 + sec;
        // out += year + format1 + mon + format1 + day + " " + hour + format2 + min;
      } else {
        out += year + format1 + mon + format1 + day;
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
.filter("svcTypeFilter",function(){
  return function(input){
    var out = '';
    input *= 1;
    switch (input) {
      case 1:
        out = '需方前置机';
        break;
      case 2:
        out = '供方前置机';
        break;
      default:
        out = '未知';

    }
    return out;
  }
})
.filter("monitorStatusFilter",function(){
  return function(input){
    var out = '';
    input *= 1;
    switch (input) {
      case 1:
        out = '监控中';
        break;
      case 2:
        out = '已停止监控';
        break;
      default:
        out = '未知';

    }
    return out;
  }
})
