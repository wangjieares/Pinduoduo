importClass("android.content.ClipboardManager")
config = {
    manager: context.getSystemService(context.CLIPBOARD_SERVICE),
    listener: {
        onPrimaryClipChanged: function () {
            var previousTime = 0
            var currentTime = (new Date()).getTime()
            log("现在的时间",currentTime)
            log("有剪切事件发生！")
            if (currentTime - previousTime > 200 && manager.hasPrimaryClip() && manager.getPrimaryClip().getItemCount() > 0) {
                previousTime = (new Date()).getTime()
                log("上次执行的时间",previousTime)
                var textClip = manager.getPrimaryClip().getItemAt(0).getText();
                if (textClip != null) {
                    log("获取到文字", textClip)
                    let reg_exp = /.*⇥[A-Za-z0-9]*⇤.*/
                    var reg_result = reg_exp.test(textClip)
                    log("文字是否匹配", reg_result)
                    if (reg_result) {
                        setTimeout(function () {
                            log("准备执行子脚本")
                            log(engines.execScriptFile("callback.js"))
                        }, 1000)
                    }
                }
            }

        }
    },
    options:{
        timeout:2000,
        intervalnum:3,
        width:device.width,
        height:device.height
    },
    motionPosition:function(){
        var cancle = setInterval(function(){
            seedRandom = random()
            if(seedRandom*10<7){
                log("模拟滑动函数开始执行")
                if(startNext = className(android.view.View).text(" 当前页面浏览").exists()){
                    var valuePostion = modules.options.height/4
                    startPosition = [random(450,500),random(valuePostion+600,valuePostion+1300)]//开始坐标点
                    processPosition = [random(450,500),random(valuePostion+300,valuePostion+600)]
                    endPosition = [random(450,500),random(valuePostion,valuePostion+200)]//结束坐标点
                    gesture(random(500,800),startPosition,processPosition,endPosition)
                }else{
                    var valuePostion = modules.options.height/4
                    startPosition = [random(450,500),random(valuePostion-600,valuePostion-1300)]//开始坐标点
                    processPosition = [random(450,500),random(valuePostion-300,valuePostion-600)]
                    endPosition = [random(450,500),random(valuePostion,valuePostion-200)]//结束坐标点
                    gesture(random(500,800),startPosition,processPosition,endPosition)
                }
            }
            
            log("模拟滑动函数结束执行")
        },random(1000,1800))
    }
}
log("模块加载完成")

module.exports = config;