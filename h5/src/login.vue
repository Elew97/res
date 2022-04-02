<template>
    <div class="login">
        <div class="login-header">
            <div class="header-icon mr10">
                <img src="@/assets/img/icon.jpg" />
            </div>
            <div class="login-name">
                <h4>时光餐馆</h4>
            </div>
        </div>
        <div class="login-ipt">
            <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                icon="question-o"
                placeholder="请输入用户名"
                bind:click-icon="onClickIcon"
                class="login-ipt__name"
            />
        </div>
        <div class="login-ipt">
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                class="login-ipt__password"
            />
        </div>
        <div class="login-btn">
            <van-button
                type="primary"
                @click="login"
                block
                class="login-btn__item"
                color="linear-gradient(to right, #4bb0ff, #6149f6)"
            >登录</van-button>
        </div>
        <div class="login-bottom">
            <span @click="toRegister">新用户注册</span>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapMutations(['setInfo']),
        login() {
            this.$api.userLogin({ user_name: this.username, password: this.password }).then((res) => {
                console.log(res)
                const info = res.data.data[0] || {}
                // localStorage.setItem(info)
                this.setInfo(info)
                this.$router.push({
                    name: 'home',
                })
                this.$toast.success(res.data.msg)
            }).catch(err => {
                this.$toast.error("登录失败")
            })
        },
        toRegister() {
            this.$router.push({
                name: 'Register'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    margin-top: 150px;
    &-header {
        display: flex;
        justify-content: center;
        align-items: center;
        & .header-icon {
            img {
                width: 15vw;
                height: 15vw;
                border-radius: 50%;
            }
        }
    }
    .login-ipt {
        margin: 40px;
        &__name,
        &__password {
            border-radius: 100px;
        }
    }
    &-btn {
        margin: 40px;
        &__item {
            border-radius: 100px;
        }
    }
    &-bottom {
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -80px;
    }
}
</style>