<template>
    <div>
        <h2>name:{{ name }}</h2>
        <h2>age:{{ age }}</h2>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string;
    age: number;
}>()

console.log(props.name, props.age)
</script>

<style scoped></style>