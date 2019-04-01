const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/weather',function(req, res, next) {
    let resJson = {
        status: false,
        msg: '',
        data: {}
    };
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }
    request({
        url: "http://api.k780.com/?app=weather.today&weaid=" + ip + "&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        }
    }, function(err, response, body) {
        if(body.success) {
            resJson.status = true;
            resJson.msg = '查找成功';
            resJson.data = body.result;
            res.send(resJson);
        } else {
            res.send(resJson);
        }
    })
})

module.exports = router