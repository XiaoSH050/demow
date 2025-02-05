<script lang="ts">
export default {
  name: "List",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { UserList, DeleteUser } from "@/apis/user";
import addEditorUser from "./addEditorUser.vue";
import { ElMessage } from "element-plus";
const keyword = ref("");
const reset = () => {
  keyword.value = "";
  page.value = 1;
  getUserList();
};
const search = () => {
  page.value = 1;
  getUserList();
};
// 获取列表数据
const page = ref(1);
const page_size = ref(5);
const total = ref(0);
const dataArr = ref([]);
const getUserList = async () => {
  const res = await UserList(page.value, page_size.value, keyword.value);
  dataArr.value = res.data.results;
  total.value = res.data.count;
};
onMounted(() => getUserList());
// 翻页
const changePage = (val: number) => {
  page.value = val;
  getUserList();
};
const changePageSize = (val: number) => {
  page.value = 1;
  page_size.value = val;
  getUserList();
};
// 添加用户
const drawer = ref(false);
const title = ref("添加用户");
const adduser = () => {
  title.value = "添加用户";
  drawer.value = true;
};
const userRow = ref({});
const closeDrawer = () => {
  drawer.value = false;
  userRow.value = ref({});
  getUserList();
};
// 删除用户
const deleteUser = async (row: any) => {
  await DeleteUser(row.id);
  page.value = 1;
  getUserList();
  ElMessage.success("删除成功");
};
// 编辑用户

const editUser = (row: any) => {
  // console.log(row);
  title.value = "编辑用户";
  drawer.value = true;
  userRow.value = row;
  // console.log(row);
};
const ids: any = ref("");
const moredisabled = ref(true);
const selectAll = (row: any) => {
  ids.value = row.map((item: any) => item.id);
  if (ids.value.length > 0) {
    moredisabled.value = false;
  } else {
    moredisabled.value = true;
  }
};
const deleteMore = async () => {
  if (ids.value) {
    await DeleteUser(ids.value);
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    getUserList();
  } else {
    ElMessage({
      message: "请选择要删除的用户",
      type: "error",
    });
  }
};
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input
          placeholder="请你输入搜索用户名"
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
    <el-button
      type="primary"
      size="default"
      @click="adduser"
      v-has="`btn.user.add`"
      >添加用户</el-button
    >
    <el-button
      type="danger"
      size="default"
      @click="deleteMore"
      :disabled="moredisabled"
      v-has="`btn.user.del`"
      >批量删除</el-button
    >
    <el-table
      :data="dataArr"
      border
      style="width: 100%; margin-top: 20px"
      @select-all="selectAll"
      @select="selectAll"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="#" width="55" />
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column
        prop="user_name"
        label="用户名"
        width="100"
        align="center"
      />
      <el-table-column
        prop="phone_number"
        label="手机号"
        width="100"
        align="center"
      />
      <el-table-column prop="gender" label="性别" width="60" align="center" />
      <el-table-column
        prop="role"
        label="角色"
        width="100"
        align="center"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          {{ row.role.map((item) => item.role_name).join(",") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ct_create"
        label="创建时间"
        width="180"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="ct_update"
        label="更新时间"
        width="180"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="editUser(row)"
            v-has="`btn.user.put`"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteUser(row)"
            v-has="`btn.user.del`"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

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
  <addEditorUser
    :drawer="drawer"
    :title="title"
    :userRow="userRow"
    @closeDrawer="closeDrawer"
    @getUserList="getUserList"
  ></addEditorUser>
</template>

<style scoped lang="less">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>