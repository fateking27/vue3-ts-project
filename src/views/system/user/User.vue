<template>
    <a-button style="margin: 5px;" type="primary" @click="exportExcel(columns, state.data)">导出 Excel</a-button>
    <UserAdd></UserAdd>
    <a-table :columns="columns" :data-source=state.data :row-selection="rowSelection" rowKey="userId" :pagination='false'>
        <template #bodyCell="{ column, record }">

            <template v-if="column.key === 'name'">
                <a>
                    {{ record.name }}
                </a>
            </template>

            <template v-else-if="column.key === 'status'">
                <a-tag v-if="record.status == 0" color="red">锁定</a-tag>
                <a-tag v-if="record.status == 1" color="green">有效</a-tag>
            </template>

            <template v-else-if="column.key === 'roleName'">
                <a-tag>{{ record.roleName }}</a-tag>
            </template>

            <template v-else-if="column.key === 'action'">
                <span>
                    <a style="padding: 5px;">编辑</a>
                    <a style="padding: 5px;">删除</a>
                </span>
            </template>
        </template>
    </a-table>
    <!-- 分页 -->
    <a-pagination v-model:current="pageData.pageNum" v-model:pageSize="pageData.pageSize" :total="state.total"
        @change="pageChange" :show-total="(total: number) => `共计${total}条数据`" showQcickJumper showSizeChanger />
</template>
<script lang="ts" setup>
import { } from '@ant-design/icons-vue';
import type { TableProps, TableColumnType } from 'ant-design-vue';
import { reactive, onMounted, watchEffect } from 'vue'
import api from '../../../api/index'
import { exportExcel } from '../../../utils/excel'
import UserAdd from './UserAdd.vue';

const columns: TableColumnType<any>[] = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: "center"
    },
    {
        title: '部门',
        dataIndex: 'deptName',
        key: 'deptName',
        align: "center"

    },
    {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
        align: "center"

    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: "center"
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        align: "center"
    },
    {
        title: '权限',
        key: 'roleName',
        dataIndex: 'roleName',
        align: "center"
    },
    {
        title: '操作',
        key: 'action',
        align: "center"
    },
];

const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

onMounted(() => {
    getUsers()
})

const state = reactive({
    data: [],
    total: 0
})

const pageData = reactive({
    pageNum: 1,
    pageSize: 10,
})

const getUsers = async () => {
    const res: any = await api.global.getUsers(pageData)
    state.data = res.rows
    state.total = res.total
    console.log(res)
}

watchEffect(() => {
    getUsers()
})

const pageChange = (page: number, pageSize: number) => {
    pageData.pageNum = page;
    pageData.pageSize = pageSize
}
</script>
  
  