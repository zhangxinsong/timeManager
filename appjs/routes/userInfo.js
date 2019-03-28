const express = require('express');
const ModelUser = require('../models/user');
const router = express.Router();

router.get('/',function(req, res, next) {
    let resJson = {
        status: false,
        msg: '',
        data: {}
    }
    if(req.query.id){
        ModelUser.findOne({_id: req.query.id}, function(err, data) {
            if(err){
                resJson.msg = '网络错误';
                res.send(resJson);
            }
            if(data){
                resJson.status = true;
                resJson.msg = '查找成功';
                resJson.data = data;
                res.send(resJson);
            }else{
                res.send(resJson);
            }
        })
    }else{
        res.send(resJson);
    }
})

router.put('/edit',function (req, res, next){
	var resJson = {
		status: false,
        msg: '',
        data: {}
	};
    
	ModelUser.findByIdAndUpdate(req.query.id, { $set: { ...req.body }}, { new: true }, function (err, data){
		if(err) res.send(resJson);
        
		if(data){
            resJson.status = true;
            resJson.msg = '修改成功';
            resJson.data = data;
            res.send(resJson);
        }else{
            resJson.status = false;
            resJson.msg = '不存在的用户名';
            res.send(resJson)
        }
	});
})

module.exports = router