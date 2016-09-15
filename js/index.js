var liNum;// 轮播图数量
var imgWidth;//图片的宽度
var imgIndex = 1;//图片滚动的索引
var dotIndex = 0;//点滚动的索引
var carouselTimer;//图片滚动计时器

$(function () {
    // 获取轮播图的数量
    liNum = $(".carImg li").length;
    //获取图片的宽度
    imgWidth = parseFloat($(".carImg li a img").css("width"));

    // 复制第一个li,插入到ul的最后,用来做障眼法
    var liFirst = $(".carImg li").eq(0).clone(true);
    $(".carImg").append(liFirst);
    // 复制最后一个li,插入到ul的前边
    var liLast = $(".carImg li").eq(liNum - 1).clone(true);
    $(".carImg").prepend(liLast);

    // 将图片定位到第一个li
    $(".carousel ul").css("left", -imgWidth + "px");

    // 绑定轮播图左按钮点击事件
    $(".carLeft").click(leftImg);
    // 绑定轮播图右按钮点击事件
    $(".carRight").click(rightImg);

    // 滚动圆点点击事件
    $(".carDot li").click(dotClick);

    // 左右点击按钮的显示隐藏事件
    $(".carousel").hover(function () {
        // 左右按钮显示
        $(".carousel i").css("display", "block")
        // 停止图片轮播
        clearTimeout(carouselTimer);
    }, function () {
        // 左右按钮隐藏
        $(".carousel i").css("display", "none")
        // 开始图片轮播
        carouselTimer = setInterval(rightImg, 2000);
    });

    // 左右点击按钮的鼠标移动事件
    $(".carousel i").hover(function () {
        $(this).css("background", "rgba(80, 80, 80, 0.5)");
    }, function () {
        $(this).css("background", "rgba(80, 80, 80, 0.3)");
    });

    // 轮播图自动滚动
    carouselTimer = setInterval(rightImg, 2000);
});

// 向右滚动图片
function rightImg() {
    // 移动点的计算方式与滚动图片的不同 -- 给自己标记的

    // 如果有动画则执行到结尾
    $(".carImg").stop(false, true);

    // 将选中点移动到下个位置
    dotIndex++;

    // 如果索引滚动到超出最后一个后则赋值为0
    if (dotIndex == liNum) {
        dotIndex = 0;
    }
    // 设置滚动点的位置样式
    $(".carDot li").eq(dotIndex).addClass("current").siblings().removeClass("current");


    // 判断图片的滚动位置为最后一张时,再点击下一张,将图片位置直接定位到第一张图片,并且索引设置为1
    if (imgIndex == 6) {
        $(".carImg").css("left", -imgWidth + "px");
        imgIndex = 1;
    }

    // 图片移动到下个位置
    imgIndex++;
    // 计算向左移动的位置
    var moveLeft = -imgIndex * imgWidth;
    $(".carImg").animate({"left": moveLeft + "px"}, 500);
}

// 向左滚动图片
function leftImg() {

    // 如果有动画则执行到结尾
    $(".carImg").stop(false, true);

    // 判断点的索引为0时则赋值为总图片数量
    if (dotIndex == 0) {
        dotIndex = liNum;
    }

    // 点索引值减一
    dotIndex--;
    // 设置滚动点的样式
    $(".carDot li").eq(dotIndex).addClass("current").siblings().removeClass("current");


    // 设置滚动图片部分
    if (imgIndex == 0) {
        $(".carImg").css("left", -liNum * imgWidth + "px");
        imgIndex = liNum;
    }
    imgIndex--;
    var moveRight = -imgIndex * imgWidth;
    $(".carImg").animate({"left": moveRight + "px"}, 500);
}

// 点击点滚动到相应的图片
function dotClick() {

    // 获取当前点击点的索引值
    dotIndex = $(".carDot li").index(this);
    // 设置滚动点的样式
    $(this).addClass("current").siblings().removeClass("current");

    // 设置图片的滚动索引
    imgIndex = dotIndex + 1;
    // 设置图片滚动到相应的位置
    var moveLeft = -imgWidth * imgIndex;
    $(".carImg").animate({"left": moveLeft + "px"}, 500);
}

