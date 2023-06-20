<script setup>
import { computed } from 'vue'

const props = defineProps(['status'])

const status_color_class = computed(() => {
    switch(props.status) {
        case 'no-bus': return "text-danger"
        case 'in-buffer': return "text-primary"
        case 'second-circle': return "text-warning"
        case 'send-to-sector': return "text-success"
        case 'on-sector': return "text-danger"
        case 'on-the-road': return "text-success"
    }
    return "text-secondary"
})
</script>

<template>
    <div :class="status_color_class">
        <i :class="props.status" />
    </div>
</template>

<style scoped>
.no-bus::before {
    font: var(--fa-font-solid);
    content: "\f059";
}

.in-buffer:before {
    font: var(--fa-font-solid);
    content: "\f207";
}

.second-circle:before {
    font: var(--fa-font-solid);
    content: "\f01e";
}

.send-to-sector:before {
    font: var(--fa-font-solid);
    content: "\f1d8";
}

.on-sector:before {
    font: var(--fa-font-solid);
    content: "\f540";
}

.on-the-road:before {
    font: var(--fa-font-solid);
    content: "\f4d7";
}

</style>