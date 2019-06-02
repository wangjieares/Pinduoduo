
var modules = files.isFile("module.js") ? require("module.js") : {};
if (typeof modules !== "object") {
    modules = {};
}
log(modules.options.timeout)
var startNext
if (startNext = className("android.view.View").text("  当前页面浏览").findOne(modules.options.timeout)) {
    /**
     * 重要函数：模拟真人手势操作
     */
    log("startNext开始执行")
    modules.motionPosition()
}
