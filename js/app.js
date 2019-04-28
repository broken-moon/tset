
$(function () {
  var $container = $('#container')
  var $list = $('#list')
  var $prev = $('#prev')
  var $next = $('#next')
  var TIME = 2000 // 移动的总时间
  var ITEM_TIME = 100 //单元移动的间隔时间
  var PAGE_WIDTH = 630 // 一页的宽度
  var moving = false //是否正在翻页中
  var currLeft = $list.position().left

  // 1. 点击向右(左)的图标, 平滑切换到下(上)一页
  $next.click(function () {
    nextPage(-210)
  })
  $prev.click(function () {
    nextPage(210)
  })

  // 3. 每隔3s自动滑动到下一页
  var intervalId = setInterval(function () {
    nextPage(true);
  }, 1000)

  // 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
  $container.hover(
  	function () {
    clearInterval(intervalId)
  }, function () {
    intervalId = setInterval(function () {
      nextPage(true)
    }, 1000)
  })

  function nextPage (next) {
    // 如果正在翻页, 此次翻页请求不执行
    if(moving) {
      return
    }
    moving = true // 标识正在翻页中

    var offset = 0 //移动的总距离
    // 计算offset
    if(typeof next==='boolean') {
      offset = next ? -PAGE_WIDTH : PAGE_WIDTH
    }else{
    	offset =next; 
    }

    // 计算单元移动的距离
    var itemOffset = offset/(TIME/ITEM_TIME)
    // 当前的left
    
    // 目标的left
    var targetLeft = currLeft + offset
    // 启动循环定时器不断移动, 到达目标位置时清除定时器
    var intervalId = setInterval(function () {
    
      // 计算当前要设置的left
      currLeft += itemOffset
      if(currLeft===targetLeft) {
        //清除定时器
        clearInterval(intervalId)
        //标识翻页完成
        moving = false

        if(currLeft>0) {
          currLeft = 0;  
        } else if(currLeft<-630) {
        	nextPage(1260);
        
        }
      }
      //console.log(currLeft)
      // 更新$list的left样式
      $list.css({
        left: currLeft
      })
    }, ITEM_TIME)

  }


})