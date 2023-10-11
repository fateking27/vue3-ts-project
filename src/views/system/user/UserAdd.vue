<template>
  <a-button type="primary" @click="showDrawer">新增用户</a-button>
  <a-drawer
    v-model:open="open"
    title="新增用户"
    placement="right"
    width="500px"
  >
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      @finish="onFinish"
    >
      <a-form-item
        :name="['user', 'name']"
        label="用户名"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item
        :name="['user', 'password']"
        label="密码"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.user.password" />
      </a-form-item>
      <a-form-item
        :name="['user', 'email']"
        label="邮箱"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <a-form-item>
        <a-button
          style="margin: 5px; margin-left: 10px"
          type="primary"
          html-type="submit"
          >提交</a-button
        >

        <a-button style="margin: 5px" type="primary" @click="closeDrawer"
          >取消</a-button
        >
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive, watchEffect } from "vue";
import api from '../../../api/index'
const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
const closeDrawer = () => {
  open.value = false;
  clearValue()
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const clearValue = () => {
  formState.user = {
    name: "",
    age: "",
    email: "",
    password: "",
    introduction: "",
  };
};

const formState = reactive({
  user: {
    name: "",
    age: "",
    email: "",
    password: "",
    introduction: "",
  },
});
const onFinish = (values: any) => {
  console.log("data:", values);
  open.value = false;
  clearValue()
  console.log(formState.user)
};

const getDept = async () => {
  const res:any = await api.global.getDept()
  console.log('dept:',res)
}

watchEffect(()=>{
  getDept()
})
</script>
