<script lang="ts">
export default {
  name: "loginproc",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/user";
const router = useRouter();
const route = useRoute();
const userInfo = useUserInfoStore();
// 定义表单数据
const formData = ref({
  user_name: "",
  password: "",
  phone_number: "",
  code: "",
  login_type: "name",
});
const changeLoginType = (val) => {
  // menutype.value = val;
  formData.value.login_type = val;
};
const disabled = ref(false);
const getCodeBtn = ref();
const time = ref(60);

const getCode = () => {
  getCodeBtn.value.innerText = time.value + "s后重新获取";
  disabled.value = true;
  let timer = setInterval(() => {
    time.value--;
    getCodeBtn.value.innerText = time.value + "s后重新获取";
    if (time.value == 0) {
      clearInterval(timer);
      getCodeBtn.value.innerText = "获取验证码";
      disabled.value = false;
      time.value = 60;
    }
  }, 1000);
};

const login = async () => {
  try {
    await userInfo.getUserInfo(formData.value);
    const redirect: any = route.query.redirect;
    window.location.href = redirect || "/home";
    // router.push({ path: redirect || "/home" });
  } catch (error) {
    console.log(error);
    ElMessage.error(error.response.data.data.error);
  }
};
</script>
<template>
  <div class="login">
    <div class="login-type">
      <div @click="changeLoginType('name')">账号密码登录</div>
      <div @click="changeLoginType('phone')">手机号登录</div>
    </div>
    <el-form
      class="login-form"
      label-width="100px"
      style="color: #fff"
      model="formData"
      v-if="formData.login_type == 'name'"
    >
      <el-form-item>
        <template #label>
          <span style="color: #fff; font-size: 20px">用户名</span>
        </template>
        <el-input v-model="formData.user_name"></el-input>
      </el-form-item>
      <el-form-item>
        <template #label>
          <span style="color: #fff; font-size: 20px">密码</span>
        </template>
        <el-input
          type="password"
          v-model="formData.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      class="login-form"
      label-width="100px"
      style="color: #fff"
      model="formData"
      v-else
    >
      <el-form-item>
        <template #label>
          <span style="color: #fff; font-size: 20px">手机号</span>
        </template>
        <el-input v-model="formData.phone_number"></el-input>
      </el-form-item>
      <el-form-item>
        <template #label>
          <span style="color: #fff; font-size: 20px">验证码</span>
        </template>
        <el-input
          type="text"
          v-model="formData.code"
          style="width: 150px"
        ></el-input>

        <el-button
          type="primary"
          style="margin-left: 20px"
          :disabled="disabled"
          @click="getCode"
        >
          <template #default>
            <span ref="getCodeBtn">获取验证码</span>
          </template>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<style scoped lang="less">
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  border-radius: 10px;
  padding: 20px;
  text-shadow: 1px 1px 1px red;
  .el-input {
    font-size: 20px;
    color: red;
    font-weight: bold;
  }
  .login-type {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    div {
      cursor: pointer;
      color: #fff;
      font-size: 20px;
      margin-left: 50px;

      &:hover {
        color: red;
      }
    }
  }
  .login-btn {
    cursor: pointer;
    color: #fff;
    font-size: 30px;
    text-align: right;
    padding-right: 30px;
    border-radius: 5px;

    &:hover {
      color: red;
    }
  }
}
</style>