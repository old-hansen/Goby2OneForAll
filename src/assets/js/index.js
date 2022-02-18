//校验域名格式
function checkDomain(domain) {
    let reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

    let re = new RegExp(reg);
    return re.test(domain);
}

// 运行OneForAll
function startOneForAll(domain) {

    //获取系统函数
    let cp = parent.OneForAll.getCP();

    //按照系统类型执行command
    let cmd = parent.OneForAll.getPython3Path() + ' ' + parent.OneForAll.getOneForAll() + ' --target ' + domain + ' run';

    if (parent.OneForAll.getOSType() === 'Windows_NT') {
        //windows
        cmd = 'start cmd.exe /K ' + cmd;
        cp.exec(cmd);
    } else if (parent.OneForAll.getOSType() === 'Darwin') {
        //mac
        cp.exec(cmd);
    } else if (parent.OneForAll.getOSType() === 'Linux') {
        //Linux
        cp.exec(`bash -c "${cmd}"`);
    }

    parent.goby.showSuccessMessage('OneForAll已启动');
}

// 打开OneForAll的文件夹
function openDir(path) {
    const cp = parent.OneForAll.getCP();

    let openPath = parent.OneForAll.getBasePath();

    if (path === 'result') {
        openPath += 'results';
    }

    //按照系统不同打开文件夹
    if (parent.OneForAll.getOSType() === 'Windows_NT') {
        //windows
        cp.exec('explorer ' + openPath);
    } else if (parent.OneForAll.getOSType() === 'Darwin') {
        //mac
        cp.exec('open ' + openPath);
    } else if (parent.OneForAll.getOSType() === 'Linux') {
        //Linux 需要自行安装nautilus
        cp.exec(`nautilus ` + openPath);
    }

}