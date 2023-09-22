<template>
    <div style="height: 100vh;">
        <ECharts style="width: 400px;height: 300px;" :option="option"></ECharts>
    </div>
</template>

<script setup lang="ts">
import api from '@/api';
import { computed, ref, onMounted } from "vue"

const record = ref<any>({})

const option = computed(() => {
    return {
        title: {
            text: '近7日系统访问记录',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['您', '总数'],
            bottom: 0
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                // prettier-ignore
                data: record.value.lastSevenUserVisitCount ? record.value.lastSevenUserVisitCount?.map((item: any) => item.days) : []
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '您',
                type: 'bar',
                data: record.value.lastSevenUserVisitCount ? record.value.lastSevenUserVisitCount?.map((item: any) => item.count) : [],
            },
            {
                name: '总数',
                type: 'bar',
                data: record.value.lastSevenVisitCount ? record.value.lastSevenVisitCount?.map((item: any) => item.count) : [],
            }
        ]
    }
});

onMounted(() => {
    getRecord()
})

const getRecord = async () => {
    const user = localStorage.user
    if (user) {
        const { username } = JSON.parse(user)
        const res = await api.global.getRecord({ username })
        record.value = res.data
    }
}
</script>

<style scoped></style>