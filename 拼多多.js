var modules = files.isFile("module.js") ? require("module.js") : {};
if (typeof modules !== "object") {
    modules = {};
}
config = {
    intervalnum:3
}
manager = modules.manager
listener = modules.listener
// 所有操作都是竖屏
const WIDTH = Math.min(device.width, device.height);
const HEIGHT = Math.max(device.width, device.height);
const IS_ROOT = files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su");
setScreenMetrics(WIDTH, HEIGHT);
main()
function main(){
    sign()
    sleep(10000)
    //tree()
}
function tree(){
    var currentActivity = currentActivity()
    if(currentActivity == "com.xunmeng.pinduoduo.ui.activity.HomeActivity"){
        id("bx_").className("android.widget.TextView").text("个人中心").findOne().parent().click()
    }
    
}
function sign(){
    sleep(1000)
    auto();
    var release = device.release
    
        //如果有拼多多签到文字 则用文字打开签到
        //否则 打开拼多多自己签到
    if(release<8){
        log("安卓版本是"+release)
        reg_result = verificationText()
        if (reg_result) {
            log("执行有密文的拼多多")
            startPinText()
        }else{
            log("执行无密文的拼多多")
            app.launchPackage("com.xunmeng.pinduoduo")
            id("ie").className("android.widget.TextView").text("现金签到").findOne().parent().click()
            var promise1 = new Promise(function(resolve, reject){
                var findsi = setInterval(function(){
                    log("准备执行查找是否签到")
                var status1 = text("签到领微信零钱").exists()
                var status2= text("领取微信零钱").exists()
                if(status1){
                    className("android.view.View").text("签到领微信零钱").findOne().parent().click()
                    log("开始签到")
                    resolve("开始签到")
                    clearInterval(findsi)
                }
                if(status2){
                    toast("已经签到")
                    log("已经签到")
                    reject("已经签到")
                    clearInterval(findsi)
                }
                log("status1",status1)
                log("status2",status2)
                },1000)
            }).then(function(success) {
                log("成功签到了！"+success)
              }).catch(function(fail){log("已经签到！"+fail)})
            log("执行完毕无秘文的拼多多")
        }
    }else{
        log("监听对象状态",listener)
        log("manager",manager)
        manager.addPrimaryClipChangedListener(listener)
        sleep(60000)
        manager.removePrimaryClipChangedListener(listener)
    }
    log("主函数执行完成")
    //engines.stopAll()
}
function verificationText(){
    var textClip = getClip()
    if (textClip != null) {
        log("获取到文字", textClip)
        let reg_exp = /.*⇥[A-Za-z0-9]*⇤.*/
        var reg_result = reg_exp.test(textClip)
        log("文字是否匹配", reg_result)
        return reg_result
    }
    return false
}
//有密文的拼多多
function startPinText(){
    app.launchPackage("com.xunmeng.pinduoduo")
            className("android.widget.TextView").text("立即查看").findOne().click()
            var findsi = setInterval(function(){
                log("准备执行查找是否签到")
                var status1 = text("签到领微信零钱").exists()
                var status2= text("领取微信零钱").exists()
                if(status1){
                    className("android.view.View").text("签到领微信零钱").findOne().parent().click()
                    clearInterval(findsi)
                }
                if(status2){
                    toast("已经签到")
                    clearInterval(findsi)
                }
                log("status1",status1)
                log("status2",status2)
            }, 1500)//每隔1.5秒查找一次 exists容易卡死
}