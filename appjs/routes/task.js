const express = require('express');
const ModelTask = require('../models/zxsTask');
const router = express.Router();

router.get('/',function(req, res, next) {
    let resJson = {
        status: false,
        msg: '',
        data: {}
    }
    if(req.query.userId){
        ModelTask.find({userId: req.query.userId}, function(err, data) {
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

router.get('/one',function(req, res, next) {
    let resJson = {
        status: false,
        msg: '',
        data: {}
    }
    if(req.query.id){
        ModelTask.find({_id: req.query.id}, function(err, data) {
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

router.post('/create',function (req, res, next){
	var postData = {
		...req.body,
        userId: req.query.userId
	};

	var resJson = {
		status: false,
		msg: ''
	};
		
    ModelTask.create(postData, function (err, data){
        if(err){
            resJson.msg = '保存异常';
            res.send(resJson);
        }
        resJson.msg = '创建成功';
        resJson.status = true;
        res.send(resJson);
    });
})

router.put('/edit',function (req, res, next){
	var resJson = {
		status: false,
        msg: '',
        data: {}
	};
    
	ModelTask.findByIdAndUpdate(req.query.id, { $set: { ...req.body }}, { new: true }, function (err, data){
		if(err) res.send(resJson);
        
		if(data){
            resJson.status = true;
            resJson.msg = '修改成功';
            resJson.data = data;
            res.send(resJson);
        }else{
            resJson.status = false;
            resJson.msg = '找不到此条数据';
            res.send(resJson)
        }
	});
})

router.delete('/',function(req, res, next) {
    var resJson = {
		status: false,
        msg: '',
        data: {}
    };
    if(req.query.id){
        ModelTask.remove({_id:req.query.id},function(err, data){
            if(data){
                resJson.status = true;
                resJson.msg = '删除成功';
                resJson.data = data;
                res.send(resJson);
            }else{
                resJson.status = false;
                resJson.msg = '找不到此条数据';
                res.send(resJson);
            }
        })
    }else{
        res.send(resJson);
    }
})

module.exports = router