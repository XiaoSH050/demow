<script lang="ts">
export default {
  name: "addEditorRole",
};
</script>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, inject, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { RoleAdd, RoleUpdate } from "@/apis/user";
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "添加角色",
  },
  rowData: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["closeDialog"]);
const close = () => {
  form.value.role_name = "";
  emits("closeDialog", "getRoleList");
};

const handleClose = () => {
  form.value.role_name = "";
  emits("closeDialog");
};
const form = ref({
  role_name: "",
});
// 保存数据
const confirm = async () => {
  try {
    await RoleAdd(form.value);
    emits("closeDialog");
    emits("getRoleList");
    form.value.role_name = "";
    ElMessage.success("角色添加成功");
  } catch (error) {
    let erroestr = "";
    for (let key in error.response.data) {
      erroestr += `${key}:${error.response.data[key][0]}`;
    }
    ElMessage.error(erroestr);
    form.value.role_name = "";
  }
};
watch(
  () => props.rowData,
  (newVal) => {
    // console.log(newVal);
    form.value.role_name = newVal.role_name;
  }
);
// 修改数据
const updateRole = async () => {
  try {
    await RoleUpdate(form.value, props.rowData.id);
    emits("closeDialog");
    emits("getRoleList");
    form.value.role_name = "";
    ElMessage.success("角色修改成功");
  } catch (error) {
    let erroestr = "";
    for (let key in error.response.data) {
      erroestr += `${key}:${error.response.data[key][0]}`;
    }
    ElMessage.error(erroestr);
    form.value.role_name = "";
  }
};
</script>

<template>
  <el-dialog
    :modelValue="dialogVisible"
    :title="title"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      style="padding: 20px"
      label-width="120px"
      :model="form"
      :inline="false"
    >
      <el-form-item label="角色名称:">
        <el-input
          placeholder="请输入角色名称"
          style="width: 50%"
          v-model="form.role_name"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close" type="danger">取消</el-button>
        <el-button
          type="primary"
          @click="confirm"
          :disabled="!form.role_name"
          v-if="title == '添加角色'"
          >确定</el-button
        >

        <el-button
          type="primary"
          @click="updateRole"
          :disabled="!form.role_name"
          v-else
          >修改</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
</style>