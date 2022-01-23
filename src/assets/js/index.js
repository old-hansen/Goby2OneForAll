function checkDomain(domain) {
    var reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    return reg.test(domain);
}

function startOneForAll(domain) {

    //获取系统函数
    const fs = parent.require('fs');
    const os = parent.require('os');
    var cp = parent.require('child_process');
    let os_type = os.type();

    // 获取gobyAPI
    let goby = parent.goby;
    let config = goby.getConfiguration();

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
    // cp.exec(cmd);
    console.log(cmd);
}