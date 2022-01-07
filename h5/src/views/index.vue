<template>
    <div class="layoutContainer">
        <van-top-bar></van-top-bar>
        <div class="routerView">
            <router-view />
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item name="home" icon="home-o" @click="toPage('/home')">首页</van-tabbar-item>
            <van-tabbar-item name="list" icon="search" @click="toPage('/list')">列表</van-tabbar-item>
            <van-tabbar-item name="about" icon="setting-o" @click="toPage('/about')">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 'home'
            };
        },

        components: {},

        mounted() {},

        methods: {
            toPage(path) {
                this.$router.push({
                    path
                })
            }
        }
    }
</script>
<style lang='less'>
    .layoutContainer {
        height: 100vh;

        .routerView {
            height: calc(100vh - 200px);
            overflow-y: auto;
        }

        .van-tabbar {
            height: 100px;
            line-height: 100px;
        }

    }
</style>