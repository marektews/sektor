<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const buses = ref([])

fetch(`/api/sector/${route.params.sid}/schedule`)
.then(resp => resp.json())
.then(d => {
    console.log('Fetch sector schedule', d)
    buses.value = d
})

function congregation(item) {
    if(item.bus.lp != null)
        return `${ item.congregation.lang } - ${ item.congregation.name } (${ item.bus.lp })`
    else
        return `${ item.congregation.lang } - ${ item.congregation.name }`
}
</script>

<template>
    <div class="sector-schedule">
        <small>Nazwa zboru</small>
        <small>ID</small>
        <small>Piątek</small>
        <small>Sobota</small>
        <small>Niedziela</small>
        <template v-for="(item, index) in buses" :key="index">
            <div>{{ congregation(item) }}</div>
            <div>{{ item.bus.ident }}</div>
            <div>{{ item.d1.departure }}</div>
            <div>{{ item.d2.departure }}</div>
            <div>{{ item.d3.departure }}</div>
        </template>
    </div>
</template>

<style scoped>
.sector-schedule {
    display: grid;
    grid-template-columns: 4fr repeat(4, 1fr);
    gap: 4pt;
}
</style>