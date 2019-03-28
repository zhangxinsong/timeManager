const express = require('express');
const ModelUser = require('../models/user');
const router = express.Router();

router.post('/',function (req, res, next){
	var resJson = {
		status: false,
        msg: '',
        data: {}
	};
    
    //查找用户名
	ModelUser.findOne({name: req.body.name}, function (err, data){
		if(err) console.log(err);
        
        //判断密码是否相等
		if(data){
			if(data.password ==req.body.password){
                resJson.status = true;
                resJson.msg = '登录成功';
                resJson.data = data;
                res.send(resJson)
            }else{
                resJson.status = false;
                resJson.msg = '用户名密码不符';
                res.send(resJson)
            }
        }else{
            resJson.status = false;
            resJson.msg = '不存在的用户名';
            res.send(resJson)
        }
	});
})

module.exports = router