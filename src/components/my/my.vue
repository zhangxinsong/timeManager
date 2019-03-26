<template>
	<div class="my scroll">
		<my-header title="个人信息"/>
		<div class="part1">
			<div class="avatar-wrap">
				<img src="../../assets/images/yr.png">
			</div>
		</div>
		<ul class="part2">
			<li >
				<span class="sp">昵称</span>
				<span class="tel">{{userInfo.nickName}}</span>
				<!-- <img src="~Assets/images/rwm.png" /> -->
			</li>
			<li>
				<span class="sp">手机号</span>
				<span class="tel">{{userInfo.mobile}}</span>
				<!-- <img src="~Assets/images/tlf.png"/> -->
			</li>
			<li >
				<span class="sp">邮箱</span>
				<span class="tel">{{userInfo.email}}</span>
				<!-- <img src="~Assets/images/rwm.png" /> -->
			</li>
			<li >
				<span class="sp">性别</span>
				<span class="tel">{{userInfo.sex}}</span>
				<!-- <img src="~Assets/images/rwm.png" /> -->
			</li>
			<li >
				<span class="sp">生日</span>
				<span class="tel">{{formatDate(userInfo.birthday)}}</span>
				<!-- <img src="~Assets/images/rwm.png" /> -->
			</li>
			<li class="describe">
				<span class="sp">个性签名</span>
				<span class="des">{{userInfo.introduce}}</span>
				<!-- <img src="~Assets/images/rwm.png" /> -->
			</li>
		</ul>
		<div class="edit" @click="edit">
			编辑
		</div>
	</div>
</template>
<script type="text/javascript">
import myHeader from "../header/";
import util from "../../global-ui/util.js"
	export default{
		components: {
			myHeader
		},
		data(){
			return {
				userInfo: {}
			}
		},
		methods:{
			getUserInfo() {
				let id = localStorage.getItem("memberId")
				this.$ajax.get(`/userInfo?id=
				${id}`,{}).then(res=>{
					if(res.status){
						this.userInfo = res.data;
					};
                }).catch(err=>{
                    this.$tip.say("获取个人信息失败");
                })
			},
			formatDate(date){
				return util.formatDate(new Date(date),"YYYY-MM-DD");
			},
			edit(){
				this.$router.push({
					path: '/myEdit'
				})
			}
		},
		created(){
			this.getUserInfo();
		}
	}
</script>
<style lang="less" scoped>
	.my{
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
			padding-left: 20px;
			background: #fff;
			li{
				height: 70px;
				line-height: 70px;
				border-bottom: 1px solid #E9E9E9;/*no*/
				padding: 0 15px 0 0;
				background: white;
				position: relative;
				font-size: 0;
				img{
					width: 50px;
					position: absolute;
					right: 15px;
					top: 10px;
				}
				.sp{
					color:#333;
					font-size: 3rem;
					width: 18%;
					display: inline-block;
				}
				.tel{
					color: #999999;
					font-size: 3rem;
					margin-left: 15px;
				}
			}
			.describe{
				height: 100px;
				line-height: 40px;
				border-bottom: 1px solid #E9E9E9;/*no*/
				padding: 0 15px 0 0;
				background: white;
				position: relative;
				font-size: 0;
				.des{
					display: inline-block;
					height: 100px;
					width: 75%;
					color: #999999;
					font-size: 3rem;
					vertical-align: top;
					padding-left: 15px;
					overflow: scroll;

				}
			}
		}
		.edit{
			width: 36%;
			height: 60px;
			background-color: #fd6363;
			border-radius: 6px;
			color: #fff;
			margin: 20px auto 0 auto;
			font-size: 3.2rem;
			text-align: center;
			line-height: 60px;
		}
		.logout{
			width: 36%;
			height: 60px;
			background-color: #a7a7a7;
			border-radius: 6px;
			color: #fff;
			margin: 10px auto 0 auto;
			font-size: 3.2rem;
			text-align: center;
			line-height: 60px;
		}
	}
</style>			
