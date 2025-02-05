<script lang="ts">
export default {
  name: "AddUser",
};
</script>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";
import { UserRoleList, addUser, updateUser } from "@/apis/user";
import { ElMessage } from "element-plus";
const props = defineProps({
  drawer: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "添加用户",
  },
  userRow: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["closeDrawer", "getUserList"]);
const colse = () => {
  emits("closeDrawer");
};
// 表单
const formData = ref({
  user_name: "",
  password: "",
  phone_number: "",
  gender: "",
  role_ids: [],
});

watch(
  () => props.userRow,
  (val) => {
    if (val.user_name) {
      formData.value.user_name = val.user_name;
      formData.value.phone_number = val.phone_number;
      formData.value.role_ids = val.role.map((item: any) => item.id);
    } else {
      formData.value.user_name = "";
      formData.value.phone_number = "";
      formData.value.role_ids = [];
    }
  },
  { immediate: true }
);
// 性别
const genderArr = ref([
  { label: "男", value: "1" },
  { label: "女", value: "2" },
]);

// 规则列表
const roleArr: any = ref([]);
const getUserRoleList = async () => {
  const res = await UserRoleList();
  roleArr.value = res.data;
};
onMounted(() => getUserRoleList());

// 添加数据
const adduser = async () => {
  try {
    const res = await addUser(formData.value);
    Object.keys(formData.value).forEach((key) => {
      if (key == "role_ids") {
        formData.value[key] = [];
      } else {
        formData.value[key] = "";
      }
    });
    emits("getUserList");
    emits("closeDrawer");
    ElMessage.success("添加成功");
  } catch (error) {
    let erroestr = "";
    for (let key in error.response.data) {
      erroestr += `${key}:${error.response.data[key][0]}`;
    }
    ElMessage.error(erroestr);
  }
};

// 修改数据
const putUser = async () => {
  try {
    console.log(formData.value);
    const res = await updateUser(formData.value, props.userRow.id);
    Object.keys(formData.value).forEach((key) => {
      if (key == "role_ids") {
        formData.value[key] = [];
      } else {
        formData.value[key] = "";
      }
    });
    emits("getUserList");
    emits("closeDrawer");
    ElMessage.success("修改成功");
  } catch (error) {
    let erroestr = "";
    for (let key in error.response.data) {
      erroestr += `${key}:${error.response.data[key][0]}`;
    }
    ElMessage.error(erroestr);
  }
};

// 全选按钮
const checkAll = ref(false);
const isIndeterminate = ref(true);
const handleCheckAllChange = (val: boolean) => {
  formData.value.role_ids = val ? roleArr.value.map((item) => item.id) : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === roleArr.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < roleArr.value.length;
};
</script>
<template>
  <el-drawer
    :model-value="props.drawer"
    :title="props.title"
    :before-close="colse"
    :show-close="false"
  >
    <el-form label-width="80px" label-position="right" :model="formData">
      <el-form-item label="用户名:">
        <el-input v-model="formData.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" v-show="props.title == '添加用户'">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="formData.phone_number"></el-input>
      </el-form-item>
      <el-form-item label="性别:" v-show="props.title == '添加用户'">
        <el-radio-group v-model="formData.gender" class="ml-4">
          <el-radio value="male" size="large">男</el-radio>
          <el-radio value="female" size="large">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色:">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          Check all
        </el-checkbox>
        <el-checkbox-group
          v-model="formData.role_ids"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in roleArr"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          >
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="colse">取消</el-button>
      <el-button
        type="primary"
        @click="adduser"
        v-if="props.title == '添加用户'"
        >确定</el-button
      >
      <el-button type="primary" @click="putUser" v-else>修改</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="less">
</style>