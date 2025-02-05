<script lang="ts">
export default {
  name: "addPutEialog",
};
</script>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { PermAdd, PermPut } from "@/apis/user";
import { ElMessage } from "element-plus";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "添加权限",
  },
  rowPerm: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["close"]);
const beforeclose = () => {
  form.value = {
    permission_name: "",
    code: "",
    perm_type: "menu",
    parent_id: "",
  };
  emits("close");
};
const form = ref({
  permission_name: "",
  code: "",
  perm_type: "menu",
  parent_id: "",
});

const confirm = async () => {
  form.value.parent_id = props.rowPerm.id;
  await PermAdd(form.value);
  ElMessage.success("添加成功");
  form.value = {
    permission_name: "",
    code: "",
    perm_type: "menu",
    parent_id: "",
  };
  emits("close");

  //   emits("close");
};
const putPerm = async () => {
  await PermPut(form.value, props.rowPerm.id);
  ElMessage.success("修改成功");
  form.value = {
    permission_name: "",
    code: "",
    perm_type: "menu",
    parent_id: "",
  };
  emits("close");
};
watch(
  () => props.rowPerm,
  (newVal) => {
    if (props.title === "修改权限") {
      form.value.parent_id = newVal.parent_id ? newVal.parent_id : null;
      form.value.permission_name = newVal.permission_name;
      form.value.perm_type = newVal.perm_type;
      form.value.code = newVal.code;
    }
  },
  { immediate: true }
);
</script>

<template>
  <el-dialog
    :modelValue="props.visible"
    :show-close="false"
    width="50%"
    :before-close="beforeclose"
  >
    <template #header>
      {{ props.title }}
    </template>
    <el-card>
      <el-form model="form" label-width="auto">
        <el-form-item label="权限名称">
          <el-input v-model="form.permission_name" style="width: 40%" />
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="form.code" style="width: 40%" />
        </el-form-item>
        <el-form-item label="权限类型">
          <el-radio-group v-model="form.perm_type">
            <el-radio value="menu">菜单</el-radio>
            <el-radio value="btn">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <template #footer>
      <el-button @click="beforeclose">取消</el-button>
      <el-button
        type="primary"
        @click="confirm"
        v-if="$props.title === '添加权限'"
        >确定</el-button
      >
      <el-button type="primary" @click="putPerm" v-else>修改</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
</style>