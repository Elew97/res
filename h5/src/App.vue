<template>
    <router-view/>
</template>
<script>
export default{
    //===========================下面是解决刷新页面丢失vuex数据
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  }
}
</script>
<style lang="less">
body{
    background-color: #f7f7f7;
}
</style>
