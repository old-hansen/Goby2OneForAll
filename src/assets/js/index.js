//校验域名格式
function checkDomain(domain) {
    let reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

    let re = new RegExp(reg);
    return re.test(domain);
}

// 运行OneForAll
function startOneForAll(domain, historyFile) {

    //获取系统函数
    let cp = parent.require('child_process');
    let cp_state;

    //按照系统类型执行command
    let cmd = parent.OneForAll.getPython3Path() + ' ' + parent.OneForAll.getOneForAll() + ' --target ' + domain + ' run';

    parent.goby.showSuccessMessage('OneForAll已启动');

    $('#div-loading').show();
    $('#btn-start').attr("disabled",true);
    $('#btn-reset').attr("disabled",true);

    //先处理已存在的报告
    if (historyFile){
        let originPath = parent.OneForAll.getResultPath() + domain + '.csv';
        parent.OneForAll.getFS().rename(originPath , originPath + '.bak',function (err){});
    }else{
        //判断是否存在results目录，否则第一次使用异常
        let dirExist  = parent.OneForAll.getFS().existsSync(parent.OneForAll.getResultPath());
        if (!dirExist){
            parent.OneForAll.getFS().mkdirSync(parent.OneForAll.getResultPath());
        }
    }

    /**
     由于Node的特性，只能使用异步方法，execSync同步方法会阻断主进程，直接把goby卡死
     */
    cp_state = cp.exec(cmd);
    //cmd = 'start cmd.exe /K ' + cmd;

    //对子进程进行状态处理
    //正常退出
    cp_state.on('exit', (code) => {
        //任务正常结束
        if (code != null){

        }
    });

    //异常退出
    cp_state.on('error',(code) =>{
        if (code != null){
            alert('任务执行时异常了，请检查OneForAll配置是否修改正确');
        }
    });

    //完全退出
    cp_state.on('close', (code) => {
        //结果展示
        $('#div-loading').hide();
        let filepath = parent.OneForAll.getResultPath() + domain + '.csv';
        if (parent.OneForAll.getFS().existsSync(filepath)) {
            alert('任务完成')
            let html = csv2tables(domain);
            $("#result-table tbody").html(html);
            $('#btn-start').attr("disabled",false);
            $('#btn-reset').attr("disabled",false);
        } else {
            alert('任务完成，但未生成报告')
        }
        //后续可以加入一些数据处理类型的逻辑
        console.log(`close child process exited with code ${code}`);
    });

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
    let rows = $.csv.toArrays(data);

    //处理每行数据(除第一行)
    for (let i = 1; i < rows.length; i++) {
        //处理列数据
        let col = rows[i];

        //特殊行去重
        let col7 = col[7].split(',');
        col7 = [...new Set(col7)];

        let col8 = col[8].split(',');
        col8 = [...new Set(col8)];

        let col19 = col[19].split(',');
        col19 = [...new Set(col19)];

        let col20 = col[20].split(',');
        col20 = [...new Set(col20)];

        //生成最终页面
        html += `<tr>
                  <!--url-->
                  <td>${col[4]}</td>
                  <!--subdomain-->
                  <td>${col[5]}</td>
                  <!--cname-->
                  <td>${col7}</td>
                  <!--ip-->
                  <td>${col8}</td>
                  <!--port-->
                  <td>${col[11]}</td>
                  <!--status-->
                  <td>${col[12]}</td>
                  <!--title-->
                  <td>${col[14]}</td>
                  <!--reason-->
                  <td>${col[13]}</td>
                  <!--addr-->
                  <td>${col19}</td>
                  <!--isp-->
                  <td>${col20}</td>
                </tr>`
    }
    return html;
}