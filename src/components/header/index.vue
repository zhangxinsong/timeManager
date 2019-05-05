<template>
    <div class="my-header">
        <mt-header fixed :title="title">
            <div slot="left" @click="back">
                <img src="../../assets/images/back.png">
            </div>
        </mt-header>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: "string"
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    }
}
</script>
<style lang="less">
    .my-header{
        .mint-header{
            background-color: rgba(224,223,223,0.5) ;
            height: 60px ;
            color: #fd6363;
            img{
                height: 60px;
            }
            .mint-header-title{
                font-size: 22px;
                overflow: inherit;
            }
        }
    }
</style>
