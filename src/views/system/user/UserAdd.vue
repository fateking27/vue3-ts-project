<template>
    <a-button type="primary" @click="showDrawer">新增用户</a-button>
    <a-drawer v-model:open="open" title="新增用户" placement="right" width="500px">

        <a-form :model="formState" v-bind="layout" name="nest-messages"
            @finish="onFinish">
            <a-form-item :name="['user', 'name']" label="用户名" :rules="[{ required: true }]">
                <a-input v-model:value="formState.user.name" />
            </a-form-item>
            <a-form-item :name="['user', 'email']" label="密码">
                <a-input v-model:value="formState.user.email" />
            </a-form-item>
            <a-form-item :name="['user', 'website']" label="邮箱">
                <a-input v-model:value="formState.user.website" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
        </a-form>


    </a-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
const open = ref<boolean>(false);

const showDrawer = () => {
    open.value = true;
};

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const formState = reactive({
    user: {
        name: '',
        age: '',
        email: '',
        website: '',
        introduction: '',
    },
});
const onFinish = (values: any) => {
    console.log('Success:', values);
};
</script>
  
  