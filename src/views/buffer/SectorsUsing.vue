<script setup>
import { ref, watch } from 'vue'
const props = defineProps(['using'])
const used_color = (used) => used ? 'text-danger' : 'text-success'
// const used_to_str = (used) => used ? 'zajęty' : 'wolny'

const circle = ref(null)
watch(() => props.using, (nv) => {
    circle.value.forEach((elem) => {
        let tmp = nv[elem.id]
        elem.classList.replace(used_color(!tmp), used_color(tmp))
    })
}, { deep: true })
</script>

<template>
    <div class="sectors-using-layout">
        <div v-for="(item, index) in Object.keys(props.using)" :key="index">
            <span class="me-2">{{ item }}:</span>
            <span ref="circle" :id="item" :class="used_color(props.using[item])" >
                <i class="fa-solid fa-circle" />
                <!-- <span class="ms-1">{{ used_to_str(item.used) }}</span> -->
            </span>
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