// 完成内容：
// 正文图片的轮流播放和点击切换功能
// 点击右边悬浮介绍跳转到指定位置
// 鼠标悬浮对图片的一系列影响
/**
 * Created by Administrator on 2017/5/22.
 */
$(function () {
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
    var newOl = $('<li></li>')
    imgWrap.find('ol').append(newOl)
  }
  imgWrap.find('ol').children('li').eq(0).addClass('current')

  // 点击箭头实现左右切换
  var liArr = $('.play-img').children('li')
  var indicateLiArr = imgWrap.children('ol').children('li')
  var playIcon = $('.play-icon')
  var indicateIndex = 0 // 图下同步的小圆点的索引
  var imgIndex = 0  // 图片的索引值
  var imgWidth = firstImg[0].offsetWidth
  var isImgPlay = true

  // 动画的展示结果
  function animate (endPosition, time = 300) {
    isImgPlay = false
    $('.play-img').animate({'left': endPosition}, time, function() {
      isImgPlay = true
    })
    $(indicateLiArr[indicateIndex]).addClass('current').siblings('li').removeClass('current')
  }

  // 获取图片将要跳转的位置
  function getImgPosition () {
    if (imgIndex < 0) {
      //瞬间跳到最后一张
      $('.play-img')[0].style.left = -(liArr.length-1) * imgWidth + 'px'
      imgIndex = liArr.length - 2
    }
    if(indicateIndex < 0) {
      indicateIndex = liArr.length - 2
    }
    if(imgIndex > liArr.length - 1) {
      $('.play-img')[0].style.left = 0
      imgIndex = 1
    }
    if(indicateIndex > indicateLiArr.length - 1) {
      indicateIndex = 0
    }
    animate(-imgIndex * imgWidth)
  }

  $('.play-icon-prev').click(function () {
    if (isImgPlay) {
      imgIndex--
      indicateIndex--
      getImgPosition()
    }
  })
  $('.play-icon-next').click(function () {
    if (isImgPlay) {
      imgIndex++
      indicateIndex++
      getImgPosition()
    }
  })

  // 添加定时器，每隔一定时间切换图片
  function autoplay() {
    imgIndex++
    indicateIndex++
    if (isImgPlay) {
      getImgPosition()
    }
  }
  var timer = null
  var timer = setInterval(autoplay, 3000)

  // 鼠标移到小圆点切换图片
  for(var i = 0; i < indicateLiArr.length; i++) {
    $(indicateLiArr[i]).mouseover(function () {
      indicateIndex = $(this).index()
      imgIndex = indicateIndex
      animate(-indicateIndex * imgWidth, 0)
    })
  }

  // 鼠标悬停
  imgWrap.mouseover(function () {
    clearInterval(timer)
  })
  imgWrap.mouseleave(function () {
    timer = setInterval(autoplay, 3000)
  })

  // 二.图片跳跃设置
  // 根据滚动距离差设置跳跃内容的位置
  function scroll() {
    return {
      'top': window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, // 兼容谷歌，火狐，Ie等
      'left': window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    }
  }
  var jumpTop = $('.content-jump-wrap')[0].offsetTop
  var jumpLiArr = $('.content-jump').children('li')
  window.onscroll = function () {
    // 头部搜索框在滚动到一定高度时固定定位
    if (scroll().top > $('.content-wrap').offset().top) {
      $('.search').addClass('search-fixed')
    } else {
      $('.search').removeClass('search-fixed')
    }
    // 右侧跳跃索引固定定位
    if(scroll().top > jumpTop) {
      $('.content-jump-wrap').addClass('jump-fixed')
    } else {
      $('.content-jump-wrap').removeClass('jump-fixed')
    }
    // 根据滚动距离设置右边悬浮li的样式
    for (var i = 0; i < jumpTopArr.length; i++) {
      if (scroll().top > jumpTopArr[i] - 100) {
        $(jumpLiArr[i]).addClass('click-over-jump').siblings("li").removeClass('click-over-jump')
      }
    }
  }

  // 点击悬浮跳转到指定位置
  jumpLiArr.mouseover(function () {
    $(this).addClass('mouse-over-jump')
  })
  jumpLiArr.mouseleave(function () {
    $(this).removeClass('mouse-over-jump')
  })
  $('.back-top').click(function () {
    $('html').animate({ 'scrollTop': $('.site').height() }, 300)
  })
  var contentTop = $('.content-wrap').offset().top
  var shopTop = $('#show-shop').offset().top - contentTop// 爱逛好货
  var storeTop = $('#store-info').offset().top - contentTop// 好店直播
  var qualityTop = $('#quality-wrap').offset().top - contentTop // 品质特色
  var hotTop = $('#hot-benefit').offset().top - contentTop // 实惠热卖
  var likeTop = $('#like-sell').offset().top - contentTop // 猜你喜欢
  var jumpTopArr = [shopTop, storeTop, qualityTop, hotTop, likeTop]
  jumpLiArr.click(function () {
    $(this).addClass('click-over-jump').siblings("li").removeClass('click-over-jump')
    $('html').animate({"scrollTop": jumpTopArr[$(this).index()]}, 300)
  })

  // 使用intersectionObserver实现图片懒加载
  // var observer = new IntersectionObserver(function (elements) {
  //   elements.forEach(function(element) {
  //     if (element.intersectionRatio > 0 && element.intersectionRatio <= 1) {
  //       if (element.target.dataset.src) {
  //         element.target.src = element.target.dataset.src
  //       }
  //     }
  //   })
  // })
  // function addObserver() {
  //   var imgItems = document.querySelectorAll('img')
  //   imgItems.forEach(function(item) {
  //     observer.observe(item)
  //   })
  // }
  // addObserver()

  // 三、悬浮鼠标对图片的操作
  $('.benefit-img-wrap li').mouseenter(function() {
    $(this).css('border-color','#FF5000')
  })
  $('.benefit-img-wrap li').mouseleave(function () {
    $(this).css('border-color','#F4F4F4')
  })
})