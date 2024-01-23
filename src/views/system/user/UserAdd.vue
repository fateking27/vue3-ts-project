<template>
  <a-button type="primary" @click="showDrawer">新增用户</a-button>
  <a-drawer v-model:open="open" title="新增用户" placement="right" width="50%">
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
      <a-form-item :name="['user', 'email']" label="邮箱">
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <a-form-item :name="['user', 'phone']" label="手机">
        <a-input v-model:value="formState.user.phone" />
      </a-form-item>
      <a-form-item
        :name="['user', 'state']"
        label="状态"
        :rules="[{ required: true }]"
      >
        <a-radio-group v-model:value="formState.user.state">
          <a-radio value="0">锁定</a-radio>
          <a-radio value="1">有效</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :name="['user', 'sexx']"
        label="性别"
        :rules="[{ required: true }]"
      >
        <a-radio-group v-model:value="formState.user.sexx">
          <a-radio value="1">男</a-radio>
          <a-radio value="0">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :name="['user', 'valueHtml']" label="内容">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
          />
          <Editor
            style="height: 300px; overflow-y: hidden"
            v-model="formState.user.valueHtml"
            :defaultConfig="editorConfig"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
// const valueHtml = ref("<p>hello</p>");

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

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
    name: "",
    password: "",
    phone: "",
    email: "",
    state: "",
    sexx: "",
    valueHtml: "",
  },
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};
</script>
