<template>
    <div class="introduce">
        <my-header title="产品介绍"/>
        <p>本产品致力于用户更好的管理自我时间，拥有注册登录，计划设置，事件提醒功能。您可以通过点击下拉按钮来选取不同的计划选项以及填写计划补充，并且可以根据个人需要来开关提醒。您的满意，我的动力，祝您使用愉快。</p>
        <img src="../../assets/images/xin.gif">
    </div>
</template>
<script>
import myHeader from "../header/";
export default {
    components: {
        myHeader
    }
}
</script>
<style lang="less">
    .introduce{
        width: 100%;
        padding-top: 60px;
        p{
            width: 90%;
            margin: 0 auto;
            font-size: 16px;
            line-height: 24px;
            text-indent: 2em;
        }
    }
</style>