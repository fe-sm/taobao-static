
$(function () {
  var intDiff = parseInt(600000);//倒计时总秒数量
  function timer(intDiff) {
    window.setInterval(function () {
      var day=0,
          hour=0,
          minute=0,
          second=0;//时间默认值
      if (intDiff > 0) {
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      $('#hour_show').html(hour);
      $('#minute_show').html(minute);
      $('#second_show').html(second);
      intDiff--;
    }, 1000);
  }
  timer(intDiff);
  //1.楼梯什么时候显示，800px scroll--->scrollTop
  $(window).on('scroll',function(){
    var $scroll=$(this).scrollTop();
    if($scroll>=800){
      $('.louti_nav').show();
    }else{
      $('.louti_nav').hide();
    }
  });
  $('.goTop').on('click',function(){
    $('html,body').animate({//$('html,body')兼容问题body属于chrome
      scrollTop:0
    })
  });
});