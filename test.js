
var manager = context.getSystemService(context.CLIPBOARD_SERVICE)
var textClip = manager.getPrimaryClip().getItemAt(0).getText();
        log(textClip)
manager.addPrimaryClipChangedListener({onPrimaryClipChanged: function () {
    var previousTime = 0
    var currentTime = (new Date()).getTime()
    log("现在的时间",currentTime)
    log("有剪切事件发生！")
    if (currentTime - previousTime > 200 && manager.hasPrimaryClip() && manager.getPrimaryClip().getItemCount() > 0) {
        previousTime = (new Date()).getTime()
        log("上次执行的时间",previousTime)
        var textClip = manager.getPrimaryClip().getItemAt(0).getText();
        log(textClip)
    }
}

})
