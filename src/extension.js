function activate (content) {
    goby.registerCommand('start', function (content) {
        let path = require('path');
        let url = path.join(__dirname,'./page/index.html');
        goby.showIframeDia(url,'OneForAll',666,600);
    });
}

exports.activate = activate;