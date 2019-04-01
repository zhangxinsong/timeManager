<template>
    <div class="taskCount">
        <my-header title="任务统计"/>
    </div>
</template>
<script>
    import myHeader from "../header/";
    export default {
        components: {
			myHeader
		},
    }
</script>
<style lang="less" scoped>
    .taskCount{
        width: 100%;
        padding-top: 4rem;
    }
</style>