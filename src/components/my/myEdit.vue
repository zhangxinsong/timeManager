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
					<input type="text" v-model="name" placeholder="请输入姓名">
				</li>
				<li>
					<span>手机号</span>
					<div class="birthday">{{mobile}}</div>
				</li>
				<li>
					<span>邮箱</span>
					<input type="text" v-model="email" placeholder="请输入邮箱">
				</li>
				<li>
					<span>性别</span>
					<input type="text" v-model="sex" placeholder="请输入邮箱">
				</li>
				<li>
					<span>生日</span>
					<div class="birthday" @click="openDate">{{birthday&&showBirthday||"点击选择日期"}}</div>
				</li>
				<li class="describe">
					<span>个性签名</span>
					<div class="birthday">
						<textarea placeholder="请输入个性签名"></textarea>
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
				loginName: '',
				name: '',
				mobile: '',
				email: '',
				birthday: '',
				sex: ''
			}
		},
		computed: {
			showBirthday(){
				return util.formatDate(new Date(this.birthday),"YYYY-MM-DD");
			}
		},
		created(){
			this.getUserInfo();
		},
		methods:{
			getUserInfo(){
				var memberId = localStorage.getItem("memberId");
				this.$ajax.get(`/rest/v1/client/user/info?memberId=${memberId}`,{
				}).then(res => {
					this.loginName = res.inAPIUser.loginName;
					this.name = res.inAPIUser.name;
					this.mobile = res.inAPIUser.mobile;
					this.email = res.inAPIUser.email;
					this.birthday = new Date(res.inAPIUser.birthday);
					this.sex = res.inAPIUser.sex;
				}).catch(err => {
					console.log(err);
				})
			},
			saveUserInfo(){
				var memberId = localStorage.getItem("memberId");
				this.$ajax.put(`/rest/start/signin/update/${memberId}`,{
					birthday: this.birthday,
					email: this.email,
					mobile: this.mobile,
					name: this.name,
					sex: this.sex
				}).then(res => {
					this.$tip.say("保存成功")
					this.$router.back();
				}).catch(err => {
					console.log(err);
				})
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
		padding-top: 4rem;
		.part1{
			height: 150px;
			.avatar-wrap{
				padding-top: 40px;
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
				height: 65px;
				line-height: 65px;
				border-bottom: 1px solid #E9E9E9;/*no*/
				padding: 0 15px 0 0;
				background: white;
				position: relative;
				font-size: 3rem;
				span{
					display: inline-block;
					width: 30%;
					padding-left: 20px;
				}
				input{
					width: 60%;
					height: 60px;
					border: none;
					text-align: right;
					font-size: 3.2rem;
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
						font-size: 3rem;
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
			height: 60px;
			background-color: #fd6363;
			border-radius: 6px;
			color: #fff;
			margin: 40px auto 0 auto;
			font-size: 3.2rem;
			text-align: center;
			line-height: 60px;
		}
	}
</style>