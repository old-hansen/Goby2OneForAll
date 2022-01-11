function activate (content) {

    //获取系统函数
    let config = goby.getConfiguration();
    const fs = require('fs');
    const os = require('os');
    var cp = require('child_process');
    let os_type = os.type();

    //显示工具首页
    goby.registerCommand('showView', function (content) {
        //设置主页html路径
        let path = require('path');
        let url = path.join(__dirname,'./page/index.html');

        //检测python环境
        let python_path = config["python3"]["default"];
        // alert(python_path);
        // goby.showErrorMessage('未配置Python3路径');

        //检测oneforall路径
        let OneForAll_path = config["oneforall.py"]["default"];
        if(OneForAll_path == null){
            goby.showErrorMessage('未配置OneForAll路径');
            return;
        }

        //渲染页面
        goby.showIframeDia(url,'OneForAll',800,600);
    });
}

exports.activate = activate;