<script setup>
import { computed } from 'vue'
const props = defineProps(['using'])
const used_color = (used) => used ? 'text-danger' : 'text-success'
// const used_to_str = (used) => used ? 'zajęty' : 'wolny'

const using_list = computed(() => {
    let tmp = []
    for(const [sector, using] of Object.entries(props.using)) {
        tmp.push({ name: sector, used: using })
    }
    return tmp
})
</script>

<template>
    <div class="sectors-using-layout">
        <div v-for="(item, index) in using_list" :key="index">
            <span class="me-2">{{ item.name }}:</span>
            <span class="fa-solid fa-circle" :class="used_color(item.used)" />
            <!-- <span class="ms-1" :class="used_color(item.used)">{{ used_to_str(item.used) }}</span> -->
        </div>
    </div>
</template>

<style scoped>
.sectors-using-layout {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0 12pt;
    justify-content: center;
}
</style>