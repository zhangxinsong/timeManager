const express = require('express');
const ModelUser = require('../models/user');
const router = express.Router();

router.post('/',function (req, res, next){
	var postData = {
		mobile: req.body.mobile,
		password: req.body.password
	};

	var resJson = {
		status: false,
		msg: ''
	};
		
	ModelUser.findOne({mobile: req.body.mobile}, function (err, data){
		if(err) console.log(err);
			
		if(data){
			resJson.msg = '此用户已经被注册';
			res.send(resJson);
		}else{
			ModelUser.create(postData, function (err, data){
				if(err){
					resJson.msg = '注册异常';
					res.send(resJson);
				}
				resJson.msg = '注册成功';
				resJson.status = true;
				res.send(resJson);
			});
		}
	});
})

module.exports = router