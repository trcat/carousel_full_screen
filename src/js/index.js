window.onload = function () {
  var wrapper = document.querySelector(".swiper-wrapper");
  var slideCount = 31;
  for (var i = 1; i <= slideCount; i++) {
    var item = document.createElement("div");
    item.classList.add("swiper-slide");
    item.style.backgroundImage = "url(./src/image/" + i + ".jpg)";
    item.style.backgroundRepeat = "no-repeat";
    item.style.backgroundSize = "contain";
    item.style.backgroundPosition = "center";
    wrapper.appendChild(item);
  }
  var mySwiper = new Swiper(".swiper-container", {
    loop: true, // 循环轮播
    effect: "fade", // 设置淡入淡出的变换方式
    fadeEffect: {
      crossFade: true,
    },
    keyboard: true, // 支持键盘控制
    autoplay: {
      delay: 2000, // 自动切换间隔时间，单位毫秒
      disableOnInteraction: false, // 手动滑动后是否停止自动轮播
    },
  });

  // 检测 audio 是否处于自动播放状态
};
