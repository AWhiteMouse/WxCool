// 防抖
function debounce(fn, time = 500) {
    // 创建一个标记用来存放定时器的返回值
    let timeout = null;
    return function () {
        // 每当用户输入的时候把前一个 setTimeout clear 掉
        clearTimeout(timeout);
        // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, time);
    };
}

// 节流
function throttle(fn, time = 500) {
    // 通过闭包保存一个标记
    let canRun = true;
    return function () {
        // 在函数开头判断标记是否为true，不为true则return
        if (!canRun) return;
        // 立即设置为false
        canRun = false;
        // 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => {
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            canRun = true;
        }, time);
    };
}

module.exports = {
    debounce,
    throttle,
};
