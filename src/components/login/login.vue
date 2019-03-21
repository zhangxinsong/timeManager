<template>
    <div class="login">
        <div class="box">
            <img src="../../assets/images/gtx.png">
            <input type="text" class="userName" v-model="mobile" placeholder="手机号"/>
            <input type="password" placeholder="密码" v-model="password" /><br/>
            <span class="toforget" @click="toForget">找回密码</span>
            <span class="tosign" @click="toSign">注册</span>
            <div class="submit" @click="submit">登陆</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            mobile: '',
            password: ''
        }
    },
    methods: {
        toForget(){
            this.$router.push({
                path: '/signin',
                query: {
                    forget: "true"
                }
            })
        },
        toSign(){
            this.$router.push({
                path: '/signin'
            })
        },
        submit(){
            if(this.mobile === ''){
                this.$tip.say("请输入手机号")
            }
            else if(this.password === ''){
                this.$tip.say("请输入密码")
            }
            else{
                this.$ajax.get(`/rest/start/signin?loginName=${this.mobile}&password=${this.password}`,{
                }).then(res=>{
                    if(res.login){
                        this.$tip.say("登录成功");
                        localStorage.setItem("memberId",res.memberId);
                        this.$router.push({path:'/firstPage'});
                    }
                }).catch(err=>{
                    this.$tip.say("密码不正确");
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552891103107&di=79e5cb4a64469717e927504bb2137ded&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F13%2F20180513103324_fsuik.thumb.700_0.jpg);
        background-size: cover;
        .box{
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            text-align: center;
            padding-top: 27%;
            img{
                margin: 0 auto 50px auto;
                width: 80px;
                display: block;
            }
            .userName{
                margin-bottom: 40px;
            }
            .toforget{
                float: left;
                font-size: 3.5rem;
                margin-left: 7%;
                color: #fff;
                line-height: 4rem;
            }
            .tosign{
                float: right;
                font-size: 3.5rem;
                margin-right: 7%;
                color: #fff;
                line-height: 4rem;
            }
            .submit{
                width: 40%;
                height: 65px;
                margin: 30% auto 0 auto;
                font-size: 4rem;
                line-height: 70px;
                border: 1px solid #fff;
                background-color: transparent;
                border-radius: 35px;
                color: #fff;
            }
        }
        input{
            width: 90%;
            height: 65px;
            border: 1px solid #fff;
            background-color: transparent;
            border-radius: 35px;
            text-align: center;
            font-size: 4rem;
            color:#fff;
        }
        input:focus{
            outline-offset: none !important;
            outline: none !important;
        }
        input::-webkit-input-placeholder{
            color: #fff;
        }
    }
</style>