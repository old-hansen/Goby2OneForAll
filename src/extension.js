function activate(content) {

    //获取系统函数
    let config = goby.getConfiguration();
    const fs = require('fs');
    const os = require('os');
    let os_type = os.type();
    let cp = require('child_process');

    let Python_Path = config.python3.default;
    let OneForAll_Path = config["oneforall.py"]["default"];
    let Base_Path = '';


    class OneForAll {

        constructor() {

        }

        init() {
            //检测python环境
            if (Python_Path == null || Python_Path === '') {
                goby.showErrorMessage('未配置Python3路径');
                alert('未配置Python3路径');
                return false;
            }

            //检测oneforall路径
            if (OneForAll_Path == null || OneForAll_Path === '') {
                goby.showErrorMessage('未配置OneForAll路径');
                return false;
            }

            let len = OneForAll_Path.length - 12;
            Base_Path = OneForAll_Path.substring(0, len)

            return true;

        }

        getOS() {
            return os;
        }

        getFS() {
            return fs;
        }

        getCP() {
            return cp;
        }

        getBasePath() {
            return Base_Path;
        }

        getPython3Path() {
            return Python_Path;
        }

        getOneForAll() {
            return OneForAll_Path;
        }

        getOSType() {
            return os_type;
        }
    }


    if (!window.OneForAll) {
        window.OneForAll = new OneForAll();
    }


    //显示工具首页
    goby.registerCommand('showView', function (content) {

        //初始化失败不弹出页面
        if (!window.OneForAll.init()) {
            return;
        }
        //设置主页html路径
        let path = require('path');
        let url = path.join(__dirname, './page/index.html');

        //渲染页面
        goby.showIframeDia(url, 'OneForAll', 600, 300);
    });
}

exports.activate = activate;