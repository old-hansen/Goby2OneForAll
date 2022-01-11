function activate (content) {

    //获取系统函数
    let config = goby.getConfiguration();
    const fs = require('fs');
    const os = require('os');
    var cp = require('child_process');
    let os_type = os.type();

    //显示工具首页
    goby.registerCommand('showView', function (content) {
        //加载主页html
        let path = require('path');
        let url = path.join(__dirname,'./page/index.html');

        //检测python环境和oneforall是否安装成功
        let python_path = config["python3"]["default"];
        alert(python_path);
        let OneForAll_path = config["oneforall.py"]["default"];
        alert(OneForAll_path);


        //渲染页面
        goby.showIframeDia(url,'OneForAll',800,600);
    });
}

exports.activate = activate;