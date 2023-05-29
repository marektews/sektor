<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const data = reactive({
    buses: []
})

fetch(`/api/sector/${route.params.sid}/schedule`)
.then(resp => resp.json())
.then(d => {
    console.log('Fetch sector schedule', d)
    data.buses = d
})

</script>

<template>
    <div class="sector-schedule">
        <small>Nazwa zboru</small>
        <small>Piątek</small>
        <small>Sobota</small>
        <small>Niedziela</small>
        <template v-for="(item, index) in data.buses" :key="index">
            <div>{{ item.congregation }}</div>
            <div>{{ item.d1.departure }}</div>
            <div>{{ item.d2.departure }}</div>
            <div>{{ item.d3.departure }}</div>
        </template>
    </div>
</template>

<style scoped>
.sector-schedule {
    display: grid;
    grid-template-columns: 4fr repeat(3, 1fr);
    gap: 4pt;
}
</style>