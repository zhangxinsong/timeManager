<template>
    <div class="taskCount">
        <my-header title="任务统计"/>
        <div class="content">
            <div class="countBox">
                <p class="boxHeader">
                    本周之前
                    <img :class="showStatus.previous?'rotate':null" src="../../assets/images/down.png" @click="showList('previous')">
                </p>
                <ul v-if="showStatus.previous">
                    <li class="innerTitle">已完成<span class="frNum">{{previousFinishList.length}}</span></li>
                    <li v-for="(item,index) in previousFinishList" :key="index">
                        <div class="taskitem">
                            <p class="itemName">{{item.name}}</p>
                            <p class="itemDes">{{item.taskDes}}</p>
                        </div>
                    </li>
                </ul>
                <ul v-if="showStatus.previous">
                    <li class="innerTitle">未完成<span class="frNum">{{previousDoingList.length}}</span></li>
                    <li v-for="(item,index) in previousDoingList" :key="index">
                        <div class="taskitem">
                            <p class="itemName">{{item.name}}</p>
                            <p class="itemDes">{{item.taskDes}}</p>
                        </div>
                    </li>
                </ul>
            </div>
             <div class="countBox">
                <p class="boxHeader">
                    本周
                    <img :class="showStatus.present?'rotate':null" src="../../assets/images/down.png" @click="showList('present')">
                </p>
                <ul v-if="showStatus.present">
                    <li class="innerTitle">已完成<span class="frNum">{{presentFinishList.length}}</span></li>
                    <li v-for="(item,index) in presentFinishList" :key="index">
                        <div class="taskitem">
                            <p class="itemName">{{item.name}}</p>
                            <p class="itemDes">{{item.taskDes}}</p>
                        </div>
                    </li>
                </ul>
                <ul v-if="showStatus.present">
                    <li class="innerTitle">未完成<span class="frNum">{{presentDoingList.length}}</span></li>
                    <li v-for="(item,index) in presentDoingList" :key="index">
                        <div class="taskitem">
                            <p class="itemName">{{item.name}}</p>
                            <p class="itemDes">{{item.taskDes}}</p>
                        </div>
                    </li>
                </ul>
            </div>
             <div class="countBox">
                <p class="boxHeader">
                    本周之后
                    <img :class="showStatus.after?'rotate':null" src="../../assets/images/down.png" @click="showList('after')">
                </p>
                <ul v-if="showStatus.after">
                    <li class="innerTitle">已完成<span class="frNum">{{afterFinishList.length}}</span></li>
                    <li v-for="(item,index) in afterFinishList" :key="index">
                        <div class="taskitem">
                            <p class="itemName">{{item.name}}</p>
                            <p class="itemDes">{{item.taskDes}}</p>
                        </div>
                    </li>
                </ul>
                <ul v-if="showStatus.after">
                    <li class="innerTitle">未完成<span class="frNum">{{afterDoingList.length}}</span></li>
                    <li v-for="(item,index) in afterDoingList" :key="index">
                        <div class="taskitem">
                            <p class="itemName">{{item.name}}</p>
                            <p class="itemDes">{{item.taskDes}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
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
                list: [],
                showStatus: {
                    previous: false,
                    present: true,
                    after: false,
                }
            }
        },
        computed: {
            previousFinishList() {
                return this.list.filter(item => {
                    return new Date(item.taskTime).valueOf() < new Date(this.showWeekFirstDay()[0]) && item.isFinished
                })
            },
            previousDoingList() {
                return this.list.filter(item => {
                    return new Date(item.taskTime).valueOf() < new Date(this.showWeekFirstDay()[0]) && !item.isFinished
                })
            },
            presentFinishList() {
                return this.list.filter(item => {
                    return new Date(item.taskTime).valueOf() >= new Date(this.showWeekFirstDay()[0]) && new Date(item.taskTime).valueOf() < new Date(this.showWeekFirstDay()[7]) && item.isFinished
                })
            },
            presentDoingList() {
                return this.list.filter(item => {
                    return new Date(item.taskTime).valueOf() >= new Date(this.showWeekFirstDay()[0]) && new Date(item.taskTime).valueOf() < new Date(this.showWeekFirstDay()[7]) && !item.isFinished
                })
            },
            afterFinishList() {
                return this.list.filter(item => { 
                    return new Date(item.taskTime).valueOf() > new Date(this.showWeekFirstDay()[7]) && item.isFinished
                })
            },
            afterDoingList() {
                return this.list.filter(item => {
                    return new Date(item.taskTime).valueOf() > new Date(this.showWeekFirstDay()[7]) && !item.isFinished
                })
            }
        },
        methods:{
            getTaskList() {
				let id = localStorage.getItem("memberId")
				this.$ajax.get(`/task?userId=${id}`
				).then(res=>{
					if(res.status) this.list = res.data;
                }).catch(err=>{
                    this.$tip.say("获取任务信息失败");
                })
            },
            showWeekFirstDay() {     
                var new_Date = new Date()
                var timesStamp = new_Date.getTime();
                var currenDay = new_Date.getDay();
                var dates = [];
                for(var i = 0; i < 8; i++) {
                    dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/[年月]/g, '-').replace(/[日上下午]/g, ''));
                }
                return dates
            },
            showList(type) {
                this.showStatus[type] = !this.showStatus[type]
            }
        },
        created() {
            this.getTaskList();
            console.log(this.showWeekFirstDay())
        }
    }
</script>
<style lang="less" scoped>
    .taskCount{
        width: 100%;
        padding-top: 60px;
        .content{
            width: 100%;
            height: 100%;
            overflow: scroll;
            .countBox{
                width: 90%;
                margin: 10px auto;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                .boxHeader{
                    font-size: 18px;
                    line-height: 40px;
                    padding: 0 10px;
                    img{
                        float: right;
                        width: 40px;
                        transform: rotate(-90deg);
                    }
                    .rotate{
                        transform: none;
                    }
                }
                ul{
                    padding: 5px 10px;
                    .innerTitle{
                        font-size: 16px;
                        color: #111;
                        line-height: 30px;
                        .frNum{
                            width: 25px;
                            line-height: 25px;
                            font-size: 12px;
                            background: red;
                            border-radius: 50%;
                            float: right;
                            color: #fff;
                            text-align: center;
                            margin-top: 2.5px;
                        }
                    }
                    li{
                        margin-top: 5px;
                        .taskitem{
                            background: #e3e3e3;
                            border-radius: 8px;
                            padding: 5px 10px;
                            .itemName{
                                color: #111;
                                line-height: 24px;
                                font-size: 14px;
                            }
                            .itemDes{
                                color: #7d7b7b;
                                font-size: 12px;
                                line-height: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>