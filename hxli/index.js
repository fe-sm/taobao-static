// 完成内容：
// 正文图片的轮流播放和点击切换功能
// 点击右边悬浮介绍跳转到指定位置
// 鼠标悬浮对图片的一系列影响
/**
 * Created by Administrator on 2017/5/22.
 */
$(function () {
  $('.benefit-img-wrap li').mouseenter(function() {
    $(this).css('border-color','#FF5000')
  })
  $('.benefit-img-wrap li').mouseleave(function () {
    $(this).css('border-color','#F4F4F4')
  })
  // 一.实现切换图片

  // 展示图片的左右切换播放
  var imgWrap = $('.play-img-wrap')
  imgWrap.mouseenter(function () {
    $('.play-icon').children('span').show()
  })
  imgWrap.mouseleave(function () {
    $('.play-icon').children('span').hide()
  })
  // 获取播放的第一个图片添加到ul的最后
  //设置图片数字标识
  var firstImg = imgWrap.find('li').eq(0).clone()
  var newUlWrap = imgWrap.children('ul').append(firstImg)
  for(var i = 0; i < newUlWrap.children('li').length-1; i++) {
    var neOl = $('<li></li>')
    imgWrap.find('ol').append(neOl)
  }
  imgWrap.find('ol').children('li').eq(0).addClass('current')

  // 点击箭头实现左右切换
  var liArr = $('.play-img').children('li')
  var olLiArr = imgWrap.children('ol').children('li')
  var playIcon = $('.play-icon')
  var count = 0 // 图下同步的小圆点的索引
  var key = 0  // 图片的索引值
  var imgWidth = firstImg[0].offsetWidth
  $('.play-icon-left').click(function () {
    key--
    count--
    if (key < 0) {
      //瞬间跳到最后一张
      $('.play-img')[0].style.left = -(liArr.length-1) * imgWidth + 'px'
        key = liArr.length - 2
      }
      if(count < 0){
        count = liArr.length - 2
      }
      $('.play-img').animate({'left': -key * imgWidth}, 300)
      $(olLiArr[count]).addClass('current').siblings('li').removeClass('current')
  })
  $('.play-icon-right').click(function () {
    autoplay()
  })

  // 鼠标移到小圆点切换图片
  for(var i = 0; i < olLiArr.length; i++){
    $(olLiArr[i]).mouseover(function () {
      count = $(this).index()
      key = count
      $(this).addClass('current').siblings('li').removeClass('current')
      $('.play-img')[0].style.left = -count * imgWidth + 'px'
    })
  }

  // 添加定时器，每隔一定时间切换图片
  function autoplay() {
    key++
    count++
    if(key > liArr.length - 1) {
      $('.play-img')[0].style.left = 0
      key=1
    }
    if(count > olLiArr.length - 1) {
      count = 0
    }
    $('.play-img').animate({'left': -key * imgWidth})
    $(olLiArr[count]).siblings('li').removeClass('current')
    $(olLiArr[count]).addClass('current')
  }
  var timer = null
  var timer = setInterval(autoplay, 3000)
  imgWrap.mouseover(function () {
    clearInterval(timer)
  })
  imgWrap.mouseleave(function () {
    timer = setInterval(autoplay, 3000)
  })

  // 根据滚动距离差还设置跳跃内容的位置
  function scroll() {
    return {
      'top': window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, // 兼容谷歌，火狐，Ie等
      'left': window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    }
  }
  var jumpTop = $('.content-jump')[0].offsetTop
  window.onscroll = function () {
    if(scroll().top > jumpTop) {
      $('.content-jump').addClass('jump-fixed')
    } else {
      $('.content-jump').removeClass('jump-fixed')
    }
  }

  // 点击悬浮跳转到指定位置
  $('.content-jump').children('li').mouseover(function () {
    $(this).addClass('mouse-over-jump')
  })
  $('.content-jump').children('li').mouseleave(function () {
    $(this).removeClass('mouse-over-jump')
  })
  $('.back-top').click(function () {
    $('html').animate({ 'scrollTop': $('.site').height() }, 300)
  })
  var shopTop = $('#show-shop').offset().top // 爱逛好货
  var storeTop = $('#store-info').offset().top // 好店直播
  var qualityTop = $('#quality-wrap').offset().top // 品质特色
  var hotTop = $('#hot-benefit').offset().top // 实惠热卖
  var likeTop = $('#like-sell').offset().top // 猜你喜欢
  $('.content-jump').children('li').click(function () {
    $(this).addClass('click-over-jump').siblings("li").removeClass('click-over-jump')
    var jumpTopArr = [shopTop, storeTop, qualityTop, hotTop, likeTop]
    $('html').animate({"scrollTop": jumpTopArr[$(this).index()]}, 500)
  })
})