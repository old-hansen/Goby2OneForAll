//校验域名格式
function checkDomain(domain) {
    let reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

    let re = new RegExp(reg);
    return re.test(domain);
}

// 运行OneForAll
function startOneForAll(domain) {

    //获取系统函数
    let cp = parent.require('child_process');

    //按照系统类型执行command
    let cmd = parent.OneForAll.getPython3Path() + ' ' + parent.OneForAll.getOneForAll() + ' --target ' + domain + ' run';

    parent.goby.showSuccessMessage('OneForAll已启动');

    //使用同步方法
    if (parent.OneForAll.getOSType() === 'Windows_NT') {
        //windows
        cmd = 'start cmd.exe /K ' + cmd;
        cp.execSync(cmd);
    } else if (parent.OneForAll.getOSType() === 'Darwin') {
        //mac
        cp.execSync(cmd);
    } else if (parent.OneForAll.getOSType() === 'Linux') {
        //Linux
        cp.execSync(`bash -c "${cmd}"`);
    }

    //结果展示
    let filepath = parent.OneForAll.getResultPath() + domain + '.csv';
    alert(filepath)
    if (parent.OneForAll.getFS().existsSync(filepath)) {
        alert('任务完成')
        let html = csv2tables(domain);
        $("#result-table tbody").html(html);
    } else {
        alert('任务完成，但未生成报告')
    }

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

function csv2tables(domain) {
    let data = parent.OneForAll.readCSV(parent.OneForAll.getBasePath() + 'results/' + domain + '.csv');
    let html = '';

    //通过jquery-csv读取csv避免引号和空数据处理不完全
    var rows = $.csv.toArrays(data);

    //处理每行数据(除第一行)
    for (let i = 1; i < rows.length; i++) {
        //处理列数据
        let col = rows[i];
        html += `<tr>
                  <!--id-->
                  <td>${col[0]}</td>
                  <!--url-->
                  <td>${col[4]}</td>
                  <!--subdomain-->
                  <td>${col[5]}</td>
                  <!--cname-->
                  <td>${col[7]}</td>
                  <!--ip-->
                  <td>${col[8]}</td>
                  <!--port-->
                  <td>${col[11]}</td>
                  <!--status-->
                  <td>${col[12]}</td>
                  <!--title-->
                  <td>${col[14]}</td>
                  <!--reason-->
                  <td>${col[13]}</td>
                  <!--addr-->
                  <td>${col[19]}</td>
                  <!--isp-->
                  <td>${col[20]}</td>
                </tr>`
    }
    return html;
}