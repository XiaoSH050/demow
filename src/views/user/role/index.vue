<script lang="ts">
export default {
  name: "Role",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { RoleList, RoleDel } from "@/apis/user";
import addEditorRole from "./addEditorRole.vue";
import pointsPerm from "./pointsPerm.vue";
const keyword = ref("");
const search = () => {
  page.value = 1;
  getRoleList();
};
const reset = () => {
  keyword.value = "";
  getRoleList();
};

// 获取列表数据
const page = ref(1);
const page_size = ref(5);
const total = ref(0);
const dataArr = ref([]);
const getRoleList = async () => {
  const res = await RoleList(page.value, page_size.value, keyword.value);
  // console.log(res);
  dataArr.value = res.data.results;
  total.value = res.data.count;
};
onMounted(() => getRoleList());
// 翻页
const changePage = (val: number) => {
  page.value = val;
  getRoleList();
};
const changePageSize = (val: number) => {
  page.value = 1;
  page_size.value = val;
  getRoleList();
};
// 添加角色
const dialogVisible = ref(false);
const title = ref("添加角色");
const addRole = () => {
  title.value = "添加角色";
  dialogVisible.value = true;
};

// 编辑角色
const rowData = ref({});
const editRole = (row: any) => {
  rowData.value = row;
  title.value = "编辑角色";
  dialogVisible.value = true;
};
// 角色删除
const delRole = async (id: number) => {
  await RoleDel(id);
  getRoleList();
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
};
// 打开抽屉
const drawer = ref(false);
const rowRole = ref({});
const openDrawer = (row: any) => {
  nextTick(() => {
    rowRole.value = row;
    drawer.value = true;
  });
};
// 关闭抽屉
const closeDrawer = () => {
  drawer.value = false;
};
// 关闭抽屉
const colseDrawer = () => {
  drawer.value = false;
};
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="角色搜索:">
        <el-input
          placeholder="请输入你的角色"
          v-model="keyword"
          style="min-width: 249px"
          @blur="search"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="search"
          >搜索</el-button
        >
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button type="primary" @click="addRole">+ 添加角色</el-button>
    <addEditorRole
      :dialogVisible="dialogVisible"
      :title="title"
      :rowData="rowData"
      @closeDialog="closeDialog"
      @getRoleList="getRoleList"
    />
    <el-table :data="dataArr" border style="width: 100%; margin-top: 20px">
      <el-table-column type="index" label="#" width="55" />
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column
        prop="role_name"
        label="角色名称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="ct_create"
        label="创建时间"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="ct_update"
        label="更新时间"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openDrawer(row)"
            v-has="`but.Role.distribute`"
            >分配权限</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="editRole(row)"
            v-has="`btn.Role.put`"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="delRole(row.id)"
            v-has="`btn.Role.del`"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限 -->
    <pointsPerm
      :drawer="drawer"
      :rowRole="rowRole"
      @colseDrawer="colseDrawer"
      @getRoleList="getRoleList"
    ></pointsPerm>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px"
      v-model:current-page="page"
      v-model:page-size="page_size"
      :page-sizes="[5, 10, 15]"
      :background="true"
      layout="prev, pager,next, jumper,->, sizes, total"
      :total="total"
      @size-change="changePageSize"
      @current-change="changePage"
    />
  </el-card>
</template>

<style scoped lang="less">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>