<template>
  <div class="edit-data">
      <div class="edit-data-back">
          <van-icon name="arrow-left" @click.native="backRegister"/>
      </div>
      <div class="edit-data__title">修改资料</div>
      <div class="header-icon mr10">
            <img src="@/assets/img/icon.jpg" />
      </div>
      <!-- <div class="edit-data-ipt">
            <van-field
                v-model="password"
                type="password"
                label="用户名"
                placeholder="请输入用户名"
                required
                class="edit-data-ipt__password"
            />
        </div> -->
       <div class="edit-data-ipt">
            <van-field
                v-model="password"
                type="password"
                label="旧密码"
                placeholder="请输入旧密码"
                required
                class="edit-data-ipt__password"
            />
        </div>
        <div class="edit-data-ipt">
            <van-field
                v-model="password2"
                type="password"
                label="新密码"
                placeholder="请输入新密码"
                required
                class="edit-data-ipt__password"
            />
        </div>
        <div class="edit-data-ipt">
            <van-field
                v-model="password3"
                type="password"
                label="验证密码"
                placeholder="请再次输入新密码"
                required
                class="edit-data-ipt__password"
            />
        </div>
        <div class="edit-data-btn">
            <van-button type="primary" @click="save" block class="edit-data-btn__item" color="linear-gradient(to right, #4bb0ff, #6149f6)">保存</van-button>
        </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        password:'',
        password2:'',
        password3:''
    }
},
methods:{
     backRegister(){
        this.$router.back()
    },
    save(){
        this.$router.push({name:'login'})
    }
}
}
</script>

<style scoped lang="less">
.edit-data{
    &__title{
        text-align: center;
        margin: 20px;
        font-size: 3vh;
    }
    &-back{
        margin: 20px;
        font-size: 4vh;
    }
    & .header-icon {
        text-align: center;
            img {
                width: 15vw;
                height: 15vw;
                border-radius: 50%;
        }
    }
        .edit-data-ipt {
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