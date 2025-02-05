<script lang="ts">
export default {
  name: "PointsPerm",
};
</script>
<script lang="ts" setup>
import {
  ref,
  defineProps,
  defineEmits,
  onMounted,
  watch,
  nextTick,
  computed,
} from "vue";
import { PermList, RolePerm, defaultRolePerm } from "@/apis/user";
import { ElMessage } from "element-plus";
const props = defineProps({
  drawer: {
    type: Boolean,
    default: false,
  },
  rowRole: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["colseDrawer", "getRoleList"]);
// 定义tree的ref
const tree = ref();
// 关闭抽屉
const colse = () => {
  emits("colseDrawer");
  emits("getRoleList");
  filterCheckedKeys.value = [];
  getPermList();
};
const defaultProps = {
  children: "children",
  label: "permission_name",
};
const PermArr = ref([]);
const getPermList = async () => {
  const res = await PermList();
  PermArr.value = res.data;
};
onMounted(() => getPermList());
// 更新权限
const roleId = ref();
const selectedKeys = ref([]);
const halfSelectedKeys = ref([]);
const updatePerm = async () => {
  //  当前角色的ID
  roleId.value = props.rowRole.id;
  // 当前被选中的节点ID
  selectedKeys.value = tree.value.getCheckedKeys();
  // 半选中节点Id
  halfSelectedKeys.value = tree.value.getHalfCheckedKeys();
  // 几点合并
  const permId = selectedKeys.value.concat(halfSelectedKeys.value);
  // 发送请求
  const res = await RolePerm({ roleId: roleId.value, permId });
  ElMessage.success("修改成功");
  // 数据清除
  nextTick(() => {
    for (let perm_id of permId) {
      tree.value.setChecked(perm_id, false, true);
    }
  });
  emits("colseDrawer");
  emits("getRoleList");
  getPermList();
};
const filterCheckedKeys = ref([]);
watch(
  () => props.rowRole,
  async () => {
    const res = await defaultRolePerm(props.rowRole.id);
    // 获取当前角色的权限
    filterCheckedKeys.value = res.data;
    nextTick(() => {
      tree.value.setCheckedKeys(filterCheckedKeys.value);
    });
  }
);
</script>

<template>
  <el-drawer
    :model-value="props.drawer"
    :show-close="false"
    :before-close="colse"
    size="36%"
  >
    <template #header>
      <div class="header">
        <h2>分配权限</h2>
        <div style="margin: 10px 0 0 20px">
          角色名称:
          <span
            style="
              color: #fff;
              text-shadow: 1px 1px 1px red;
              font-size: 20px;
              cursor: pointer;
            "
            >{{ props.rowRole.role_name }}</span
          >
        </div>
      </div>
    </template>
    <template #default>
      <el-tree
        style="max-width: 600px"
        :data="PermArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="filterCheckedKeys"
        ref="tree"
      />
    </template>
    <template #footer>
      <el-button @click="colse">取消</el-button>
      <el-button type="primary" @click="updatePerm">确定</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="less">
// .el-drawer__header {
//   flex-wrap: nowrap;
// }
</style>