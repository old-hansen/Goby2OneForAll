//校验域名格式
function checkDomain(domain) {
    // let reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    let reg = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,62}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

    let re = new RegExp(reg);
    alert('domain = ' + domain);
    return re.test(domain);
}

// 运行OneForAll
function startOneForAll(domain) {

    //获取系统函数
    const fs = parent.OneForAll.getFS();
    const os = parent.OneForAll.getOS();
    var cp = parent.OneForAll.getCP();
    let os_type = os.type();

    // 获取gobyAPI
    let config = parent.goby.getConfiguration();

    var oneforall_path = config["oneforall.py"]["default"];
    var oneforall_dir = oneforall_path.substring(0,oneforall_path.length - 12);
    alert(oneforall_dir);

    return;
    
    //按照系统类型执行command
    var cmd = config["python3"]["default"] + ' ' + config["oneforall.py"]["default"] + ' --target ' + domain + ' run';
    console.log(os.type())
    if (os.type() == 'Windows_NT') {
        //windows
        cmd += ' && explorer ' + open_dir;
        cp.exec(cmd);

    } else if (os.type() == 'Darwin') {
        //mac
        cmd += ' && open ' + open_dir
        cp.exec(`osascript -e 'tell application "Terminal" to do script "${cmd}"'`)
    } else if (os.type() == 'Linux') {
        //Linux
        cp.exec(`bash -c "${cmd}"`)
    }
}

// 打开OneForAll的文件夹
function openDir() {
    const os = parent.OneForAll.getOS();
    const cp = parent.OneForAll.getCP();
    let path = parent.goby.getConfiguration()["oneforall.py"]["default"];

    let len = path.length - 12;
    path = path.substring(0,len);
    let cmd = '';

    if (os.type() == 'Windows_NT') {
        //windows
        cmd = 'explorer ' + path;
        cp.exec(cmd);
    } else if (os.type() == 'Darwin') {
        //mac
        cmd = 'open ' + path;
        cp.exec(`osascript -e 'tell application "Terminal" to do script "${cmd}"'`)
    } else if (os.type() == 'Linux') {
        //Linux 需要自行安装nautilus
        cmd = `nautilus ` + path;
        cp.exec(cmd);
    }

}