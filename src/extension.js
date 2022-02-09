function activate(content) {

    //获取系统函数
    let config = goby.getConfiguration();
    const fs = require('fs');
    const os = require('os');
    var cp = require('child_process');
    let os_type = os.type();

    class OneForAll {

        constructor(){
            
        }

        init(){
            //检测python环境
            var python_path = config.python3.default;
            var OneForAll_path = config["oneforall.py"]["default"];

            alert(python_path);
            // goby.showErrorMessage('未配置Python3路径');

            //检测oneforall路径
            if (OneForAll_path == null || OneForAll_path === '') {
                goby.showErrorMessage('未配置OneForAll路径');
                return;
            }
        }

        getOS(){
            return os;
        }

        getFS(){
            return fs;
        }

        getCP(){
            return cp;
        }
    }

    if(!window.OneForAll){
        window.OneForAll = new OneForAll();
    }

    
    //显示工具首页
    goby.registerCommand('showView', function (content) {

        window.OneForAll.init();
        //设置主页html路径
        let path = require('path');
        let url = path.join(__dirname, './page/index.html');

        //渲染页面
        goby.showIframeDia(url, 'OneForAll', 800, 600);
    });
}

exports.activate = activate;