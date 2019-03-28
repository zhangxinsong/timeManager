<template>
    <div class="add scorll">
        <div class="form">
            <my-header title="添加任务"/>
            <ul>
                <li>
                    <input type="text" v-model="taskData.name" placeholder="请输入任务名称">
                </li>
                <li>
                    <div class="taskType" @click="chooseType">{{taskData.taskType ||' 点击选择任务类型'}}</div>
                </li>
                <li>
                    <div class="taskType" @click="chooseTime">{{formateDate(taskData.taskTime) || '点击选择提醒时间'}}</div>
                </li>
                <li>
                    <div class="taskType" @click="chooseRemind">
                        <img v-if="taskData.isRemind" src="../../assets/images/green.png">
                        <img v-else src="../../assets/images/red.png">
                        <span>{{taskData.isRemind ? "提醒" : "不提醒"}}</span>
                        <span>（点击切换提醒）</span>
                    </div>
                </li>
                <li>
                    <textarea class="describe" v-model="taskData.taskDes" rows="6" placeholder="请输入任务描述">
                    </textarea>
                </li>
            </ul>
            <div class="save" @click="saveTask">
                保存
            </div>
        </div>
        <mt-popup
            v-model="showTaskType"
            position="bottom">
            <mt-picker :slots="slots" :visibleItemCount="3" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <mt-datetime-picker
            ref="picker"
            type="datetime"
            v-model="taskData.taskTime">
        </mt-datetime-picker>
    </div>
</template>
<script>
import myHeader from "../header/";
import util from "../../global-ui/util.js"
export default {
    components: {
        myHeader
    },
    data() {
        return {
            showTaskType: false,
            taskData: {
                name: '',
                taskType: '',
                taskTime: new Date(),
                isRemind: false,
            },
            slots: [{
                flex: 1,
                values: ['学习任务', '活动时间', '读书计划', '运动计划', '待办事项',],
                className: 'slot3',
                textAlign: 'center'
            }],
        }
    },
    methods: {
        getTaskData(){
            let id = this.$route.query.id
            if(id){
				this.$ajax.get(`/task/one?id=${id}`,{}).then(res=>{
					if(res.status){
						this.taskData = res.data[0];
					};
                }).catch(err=>{
                    this.$tip.say("获取任务信息失败");
                })
            }
        },
        formateDate(date){
            return util.formatDate(new Date(date),"YYYY-MM-DD HH:mm")
        },
        chooseType(){
            this.showTaskType = true;
        },
        chooseTime(){
            this.$refs.picker.open();
        },
        chooseRemind(){
            this.taskData.isRemind = !this.taskData.isRemind;
        },
        onValuesChange(a,b) {
            this.taskData.taskType = b[0];
        },
        saveTask() {
            let userId = localStorage.getItem('memberId');
            let id = this.$route.query.id;
            if(this.taskData.name === ''){
                this.$tip.say('请输入任务名称')
            }else if(this.taskData.taskType === ''){
                this.$tip.say('请选择任务类型')
            }else if(id){
                this.$ajax.put(`/task/edit?id=${id}`,this.taskData).then(res=>{
                    if(res.status){
                        this.$tip.say("修改成功");
                        this.$router.back();
                    }
                }).catch(err=>{
                    this.$tip.say("创建失败");
                })
            }else{
                this.$ajax.post(`/task/create?userId=${userId}`,this.taskData).then(res=>{
                    if(res.status){
                        this.$tip.say("创建成功");
                        this.$router.back();
                    }
                }).catch(err=>{
                    this.$tip.say("创建失败");
                })
            }
        }
    },
    created() {
        this.getTaskData();
    }
}
</script>
<style lang="less" scoped>
    .add{
        width: 100%;
        height: 100%;
        background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552968645178&di=21ad955ecf2ec572da9518d3bef67ba2&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180611%2Fad05746dd5c6449eb9ac560ffa00436c.jpeg);
        background-size: cover; 
        .form{
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.4);
            padding-top: 4rem;
            ul{
                li{
                    width: 95%;
                    background-color: rgba(243, 243, 243, 0.4);
                    border-radius: 15px;
                    margin: 25px auto;
                    font-size: 3rem;
                    text-align: center;
                    color: #7d7d7d;
                    input{
                        background-color: transparent;
                        border: none;
                        width: 100%;
                        height: 50px;
                        font-size: 3rem;
                        color: #7d7d7d;
                        text-align: center;
                    }
                    .taskType {
                        width: 100%;
                        height: 52px;
                        line-height: 52px;
                        img{
                            height: 48px;
                            vertical-align: top;
                        }
                    }
                    .describe{
                        background-color: transparent;
                        border: none;
                        font-size: 3rem;
                        color: #7d7d7d;
                        width: 80%;
                        text-align: center;
                    }
                    textarea:focus{
                        outline-offset: 0;
                        outline: 0;
                        font-size: 3rem;
                        color: #7d7d7d;
                    }
                }
            }
            .save{
                width: 95%;
                margin: 0 auto;
                height: 50px;
                background-color: rgba(251, 21, 21, 0.4);
                color: #fff;
                border-radius: 10px;
                font-size: 3.6rem;
                line-height: 50px;
                text-align: center;
            }
        }
        .mint-popup{
            width: 100%;
            
        }
    }
</style>
<style lang="less">
    .picker-item{
        font-size: 3rem !important;
    }
</style>