<template>
  <div class="register">
      <div class="register-back">
          <van-icon name="arrow-left" @click.native="backRegister"/>
      </div>
      <div class="register-note">
          请使用手机号注册
      </div>
      <div class="register-ipt">
            <van-field
                v-model="username"
                required
                clearable
                label="手机号"
                icon="question-o"
                placeholder="请输入手机号"
                error
                bind:click-icon="onClickIcon"
                class="register-ipt__name"
            />
        </div>
        <div class="register-ipt">
            <van-field
                v-model="password"
                type="password"
                label="密码"
                error
                placeholder="请输入密码"
                required
            />
        </div>
        <!-- <div class="register-ipt">
            <van-field
                v-model="password2"
                type="password"
                label="验证密码"
                error
                placeholder="请再次输入密码"
                required
                class="register-ipt__password"
            />
        </div> -->
        <div class="register-btn">
            <van-button type="primary" @click="register" block class="register-btn__item" color="linear-gradient(to right, #4bb0ff, #6149f6)">注册</van-button>
        </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        username:'',
        password:'',
        password2:''
    }
},
methods:{
    register(){
        this.$api.userRegister({user_name:this.username,password:this.password}).then(res=>{
            this.$toast.success(res.data.msg)
            this.backRegister()
        }).catch(err=>{
            this.$toast.error(err.data.msg)
        })
    },
    backRegister(){
        this.$router.back()
    }
}
}
</script>

<style scoped lang="less">
.register{
    &-back{
        margin: 20px;
        font-size: 4vh;
    }
    &-note{
        margin-left: 20px;
        margin-top: 40px;
        font-size: 4vh;
    }
    .register-ipt {
        margin: 40px;
        &__name,&__password{
            border-radius: 100px;
        }
    }
    &-btn{
        margin: 40px;
        &__item{
            border-radius: 100px;
        }
    }
}
</style>