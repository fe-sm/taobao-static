$(function () {
    var intDiff = parseInt(600000);//倒计时总秒数量
    function timer(intDiff) {
        window.setInterval(function () {
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;//时间默认值
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
    $(window).on('scroll', function () {
        var $scroll = $(this).scrollTop();
        if ($scroll >= 800) {
            $('.louti_nav').show();
        } else {
            $('.louti_nav').hide();
        }
    });
    // 回到顶部
    $('.goTop').on('click', function () {
        $('html,body').animate({//$('html,body')兼容问题body属于chrome
            scrollTop: 0
        })
    });
    //爱逛好货
    $(".color1").on("click", function () {
        var weizhi = $('.discover_goods').offset().top;
        $('html,body').animate({scrollTop: weizhi}, 1000);
    })
    //好店直播
    $(".color2").on("click", function () {
        var weizhi = $('.shop_live').offset().top;
        $('html,body').animate({scrollTop: weizhi}, 1000);
    })
    //品质特色
    $(".color3").on("click", function () {
        var weizhi = $('.tbh_quality').offset().top;
        $('html,body').animate({scrollTop: weizhi}, 1000);
    })
    //实惠热卖
    $(".color4").on("click", function () {
        var weizhi = $('.tbh_afford').offset().top;
        $('html,body').animate({scrollTop: weizhi}, 1000);
    })
    //猜你喜欢
    $(".color5").on("click", function () {
        var weizhi = $('.tbh_hotsale').offset().top;
        $('html,body').animate({scrollTop: weizhi}, 1000);
    })
    $(".tab_menu").siblings("span").on("mouseover", function () {
        if(!$(this).hasClass("hover")){
            $(".tab_menu").siblings("span").removeClass("hover");
            $(this).addClass("hover");
            $(".tab_menu").hide();
            $(this).siblings(".tab_menu").show();
        }


    })
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    var swiper = new Swiper('.swiper-container2', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination2',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-prev2',
        prevEl: '.swiper-button-next2',
      },
    });
    //实时刷新时间单位为毫秒
    setInterval('refreSwiper()', 2000);
    /* 刷新查询 */
    function refreSwiper() {
      $(".swiper-button-next").trigger("click");
    }
    $(".swiper-container.swiper-container-horizontal").on("mouseover", function () {
      $(".promo-ft.a-all").show();
    })
    $(".swiper-container.swiper-container-horizontal").on("mouseout", function () {

      $(".promo-ft.a-all").hide();
    })
    $(".swiper-container2").on("mouseover", function () {
      $(".swiper-button-prev2,.swiper-button-next2").show();
    })
    $(".swiper-container2").on("mouseout", function () {

      $(".swiper-button-prev2,.swiper-button-next2").hide();
    })
});
