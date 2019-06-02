var modules = files.isFile("module.js") ? require("module.js") : {}


log("启动app")
app.launchPackage("com.xunmeng.pinduoduo")
log("if里面的activity", currentActivity())
className("android.widget.TextView").text("立即查看").findOne().click()

log("执行完毕回调")
var findsi = setInterval(function(){
    log("准备执行查找是否签到")
    var status1 = text("签到领微信零钱").exists()
    var status2= text("领取微信零钱").exists()
    if(status1){
        className("android.view.View").text("签到领微信零钱").findOne().parent().click()
        setTimeout(function(){
            back()
        },1000)
        clearInterval(findsi)
    }
    if(status2){
        toast("已经签到")
        clearInterval(findsi)
    }
    log("status1",status1)
    log("status2",status2)
    
    var timeout = modules.options.timeout;
    //弹窗的时间
    //如果有 当前页面浏览 说明可以赚金币
    threads.start(function () {
        var startNext;
        log("启动线程模拟手势操作")
        if (startNext = className("android.view.View").text("  当前页面浏览").findOne(modules.options.timeout)) {
            /**
             * 重要函数：模拟真人手势操作
             */
            
            log("开始模拟手势操作")
            modules.config.motionPosition()
        }
    }); 
    //可能出现的弹窗
    threads.start(function () {
        var cancelBtn;
        log("启动线程关闭意外弹窗")
        if (cancelBtn = className("android.view.View").text("下次再说").findOne(timeout)) {  
            log("关闭意外弹窗")
            cancelBtn.click();
        }
    });  

}, 1500)

