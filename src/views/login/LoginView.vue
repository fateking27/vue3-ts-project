<template>
    <div>
        <button @click="login">登录</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import api from '../../api/index'

const router = useRouter()

//登录
const login = async () => {
    const res = await api.global.login({
        // username: "admin1",
        username: "bobo",
        password: "1234qwer"
    })
    localStorage.token = res.data.token
    localStorage.user = JSON.stringify(res.data.user)
    localStorage.permissions = JSON.stringify(res.data.permissions)
    router.push('/')
    console.log(res)
}

</script>

<style scoped></style>