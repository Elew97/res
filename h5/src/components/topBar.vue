<template>
    <!-- <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="goPreBack" /> -->
     <van-nav-bar title="时光餐馆"/>
</template>

<script>
    export default {
        data() {
            return {

            };
        },

        components: {},

        mounted() {

        },

        methods: {
            goPreBack() {
                this.$router.go(-1)
            },
        }
    }
</script>
<style lang='less' scoped>
    /deep/ .van-nav-bar__content {
        height: 100px;
        line-height: 100px;
    }

    //  .listContainer {
    //         /deep/ .van-nav-bar__content {
    //             height: 100px;
    //             line-height: 100px;
    //         }
    //         /deep/ .van-cell{
    //             height: 120px;
    //             line-height: 120px;
    //             text-align: center;
    //         }
    //     }
</style>