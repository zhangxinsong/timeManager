<template>
	<div class="myEdit scroll">
		<my-header title="编辑资料"/>
		<div class="part1">
			<div class="avatar-wrap">
				<img src="../../assets/images/yr.png">
			</div>
		</div>
		<div class="part2">
			<ul>
				<li>
					<span>昵称</span>
					<input type="text" v-model="userInfo.nickName" placeholder="请输入昵称">
				</li>
				<li>
					<span>手机号</span>
					<div class="birthday">{{userInfo.mobile}}</div>
				</li>
				<li>
					<span>邮箱</span>
					<input type="text" v-model="userInfo.email" placeholder="请输入邮箱">
				</li>
				<li>
					<span>性别</span>
					<input type="text" v-model="userInfo.sex" placeholder="请输入性别">
				</li>
				<li>
					<span>生日</span>
					<div class="birthday" @click="openDate">{{birthday&&formatDate(birthday)||"点击选择日期"}}</div>
				</li>
				<li class="describe">
					<span>个性签名</span>
					<div class="birthday">
						<textarea placeholder="请输入个性签名" v-model="userInfo.introduce"></textarea>
					</div>
				</li>
			</ul>
		</div>
		<div class="edit" @click="saveUserInfo">保存</div>
		<mt-datetime-picker
			ref="picker"
			type="date"
			v-model="birthday">
		</mt-datetime-picker>
	</div>
</template>
<script type="text/javascript">
import util from "../../global-ui/util.js"
import myHeader from "../header/";
	export default{
		components: {
			myHeader
		},
		data(){
			return {
				userInfo: {
				},
				birthday: ''
			}
		},
		created(){
			this.getUserInfo();
		},
		methods:{
			getUserInfo() {
				let id = localStorage.getItem("memberId")
				this.$ajax.get(`/userInfo?id=${id}`,{}).then(res=>{
					if(res.status){
						this.userInfo = res.data;
						this.birthday = new Date(res.data.birthday)
					};
                }).catch(err=>{
                    this.$tip.say("获取个人信息失败");
                })
			},
			saveUserInfo(){
				var memberId = localStorage.getItem("memberId");
				this.userInfo.birthday = this.birthday;
				this.$ajax.put(`/userInfo/edit?id=${memberId}`,this.userInfo).then(res => {
					this.$tip.say("保存成功")
					this.$router.back();
				}).catch(err => {
					console.log(err);
				})
			},
			formatDate(date){
				return util.formatDate(new Date(date),"YYYY-MM-DD");
			},
			openDate(){
				this.$refs.picker.open();
			}
		}
	}
</script>
<style lang="less" scoped>
	.myEdit{
		position: relative;
		height: 100%;
		padding-top: 60px;
		.part1{
			height: 120px;
			.avatar-wrap{
				padding-top: 20px;
				text-align: center;
				img{
					width: 70px;
				}
			}
		}
		.part2{
			width: 100%;
			li{
				width: 100%;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #E9E9E9;/*no*/
				padding: 0 15px 0 0;
				background: white;
				position: relative;
				font-size: 16px;
				span{
					display: inline-block;
					width: 30%;
					padding-left: 20px;
				}
				input{
					width: 60%;
					height: 38px;
					border: none;
					text-align: right;
					font-size: 16px;
				}
				.birthday{
					display: inline-block;
					width: 60%;
					text-align: right;
					color: #adadad;
				}
			}
			.describe{
				height: 100px;
				.birthday{
					height: 100px;
					vertical-align: top;
					textarea{
						width: 100%;
						height: 90px;
						resize:none;
						text-align: right;
						font-size: 16px;
						color: #adadad;
					}
					textarea:focus{
						outline-offset: 0;
						outline: none;
					}
				}
			}
		}
		.edit{
			width: 36%;
			height: 40px;
			background-color: #fd6363;
			border-radius: 6px;
			color: #fff;
			margin: 20px auto 0 auto;
			font-size: 18px;
			text-align: center;
			line-height: 40px;
		}
	}
</style>