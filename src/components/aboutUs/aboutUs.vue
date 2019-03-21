<template>
    <div class="aboutus">
        <my-header title="关于我们"/>
        <p>本产品是一款时间管理软件，能够让你按照自身需求设定相应的时间计划，合理规划时间，让你更好的掌控你的时间，提高你的时间利用效率，让你更好的了解自己的时间去向。</p>
        <p>除此之外，本产品永久免费，您的喜欢是对我们最好的认可，感谢您的支持。</p>
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
    .aboutus{
        width: 100%;
        padding-top: 4rem;
        text-align: center;
        p{
            width: 90%;
            margin: 0 auto;
            font-size: 3.6rem;
            line-height: 40px;
            text-indent: 2em;
        }
    }
</style>