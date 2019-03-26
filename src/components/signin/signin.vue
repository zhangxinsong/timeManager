<template>
    <div class="signin">
        <div class="box">
            <input type="text" v-model="mobile" class="mb" placeholder="手机号"/>
            <input type="text" v-model="yzm" class="yzm mb" placeholder="验证码" />
            <button class="getYzm" @click="getYzm" :disabled="eachClick">{{yzmContent}}</button>
            <input type="password" v-model="password" class="mb" placeholder="新密码" />
            <input type="password" v-model="password1" class="mb" placeholder="确认密码" />
            <div class="save" @click="submit">{{forget?"保存":"注册"}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            mobile: '',
            password: '',
            password1: '',
            yzm: '',
            eachClick: false,
            yzmTimer: 60,
            yzmContent: '验证码',
            forget: false
        }
    },
    methods: {
        getYzm(){
            if(this.mobile === ''){
                this.$tip.say("请输入手机号")
            }
            else if(!(/^1[34578]\d{9}$/.test(this.mobile))){
                this.$tip.say("请输入正确的手机号")
            }
            // else{
            //     this.yzmTimerUpdate();
            // }
        },
        yzmTimerUpdate(){  //验证码倒计时
            if(!this.eachClick){
                this.eachClick = true;
                this.yzmContent = '('+ this.yzmTimer + 's)';
                let timer = setInterval(()=>{
                    if(this.yzmTimer > 0){
                        this.yzmTimer--;
                        this.yzmContent = '('+ this.yzmTimer + 's)';
                    }else{
                        this.eachClick = false;
                        this.yzmTimer = 60;
                        this.yzmContent = "验证码";
                        clearInterval(timer);
                    }
                },1000);
            }
        },
        submit(){
            if(this.mobile === ''){
                this.$tip.say("请输入手机号")
            }
            // else if(this.yzm === ''){
            //     this.$tip.say("请输入验证码")
            // }
            else if(this.password === ''){
                this.$tip.say("请输入新密码")
            }
            else if(this.password1 === ''){
                this.$tip.say("请输入确认密码")
            }
            else if(this.password != this.password1){
                this.$tip.say("两次密码不一样")
            }
            else{
                this.$ajax.post(`/reg`,{
                    mobile: this.mobile,
                    password: this.password
                }).then( res => {
                    if(res.status){
                        this.$tip.say("注册成功");
                        this.$router.push({
                            path: '/login'
                        })
                    }else{
                        this.$tip.say("注册失败，请稍后重试");
                    }
                }).catch( err => {
                    this.$tip.say("注册失败，请稍后重试");
                })
            }
        }
    },
    created() {
        this.forget = !!this.$route.query.forget;
    }
}
</script>
<style lang="less" scoped>
    .signin{
        width: 100%;
        height: 100%;
        background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552895694520&di=33611eb910ce21b5f5e2807c080b2a0c&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft0189fdff8c86095b7f.jpg);
        background-size: cover;
        .box{
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            text-align: center;
            padding-top: 10%;
            .mb{
                margin-bottom: 20px;
            }
            .yzm{
                width: 60%;
            }
            .getYzm{
                width: 25%;
                height: 68px;
                float: right;
                margin-right: 5%;
                border: 1px solid #fff;
                border-radius: 35px;
                background: none;
                font-size: 3.6rem;
                color: #fff;
            }
            .save{
                width: 40%;
                height: 65px;
                margin: 10% auto 0 auto;
                font-size: 4rem;
                line-height: 65px;
                border: 1px solid #fff;
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
            font-size: 3.6rem;
            text-indent: 2rem;
            color: #fff;
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