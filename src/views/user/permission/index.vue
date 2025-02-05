<script lang="ts">
export default {
  name: "Permission",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { PermList, PermDel } from "@/apis/user";
import addPutEialog from "./addPutEialog.vue";
const permArr = ref([]);
const getPermList = async () => {
  const res = await PermList();
  permArr.value = res.data;
};
onMounted(() => getPermList());
// 对话框
const visible = ref(false);
const title = ref("添加权限");
const rowPerm = ref({});
// 添加权限
const addPerm = (row: any) => {
  title.value = "添加权限";
  visible.value = true;
  rowPerm.value = row;
};
// 修改权限
const putPerm = (row: any) => {
  title.value = "修改权限";
  visible.value = true;
  rowPerm.value = row;
};
// 删除权限
const deletePerm = async (row: any) => {
  await PermDel(row.id);
  getPermList();
};
// 关闭对话框
const close = () => {
  visible.value = false;
  getPermList();
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>权限管理</span>
      </div>
    </template>
    <el-table style="margin-top: 20px" border :data="permArr" row-key="id">
      <el-table-column label="权限名称" width="180" align="center">
        <template #default="{ row }">
          <span style="color: #409eff" v-if="row.perm_type === 'menu'">{{
            row.permission_name
          }}</span>
          <span style="color: #e6a23c" v-else>{{ row.permission_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="权限值" width="180" align="center" />
      <el-table-column prop="ct_update" label="更新时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.perm_type === 'btn' ? true : false"
            @click="addPerm(row)"
            >添加权限</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="putPerm(row)"
            v-has="`btn.Perm.put`"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deletePerm(row)"
            v-has="`btn.Perm.del`"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <addPutEialog
    :visible="visible"
    @close="close"
    :title="title"
    :rowPerm="rowPerm"
  />
</template>

<style scoped lang="less">
</style>