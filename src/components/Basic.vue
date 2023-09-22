<template>
    <h1>{{ state.index }}</h1>
    <h1>{{ num }}</h1>
    <h1>sum:{{ sum }}</h1>
    <button @click="num++">num+1</button>
    <Child name="Child" :age="age"></Child>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, computed } from 'vue';
import Child from './Child.vue';

const age = ref(22)

onBeforeMount(() => {
    console.log('onBeforeMount')
})

onMounted(() => {
    console.log('onMounted')
})

const state = reactive({
    index: 1
})
console.log(state)

const num = ref(0)
console.log(num)

const sum = computed(() => {
    return num.value + state.index
})

</script>

<style scoped></style>