<script setup>
import { computed } from 'vue'

const props = defineProps(['status'])

const status_color_class = computed(() => {
    switch(props.status) {
        case 'no-bus': return "text-secondary"
        case 'in-buffer': return "text-primary"
        case 'second-circle': return "text-warning"
        case 'send-to-sector': return "text-success"
        case 'on-sector': return "text-danger"
        case 'ready-to-leave': return "text-warning"
        case 'on-the-road': return "text-success"
    }
    return "text-secondary"
})
</script>

<template>
    <div :class="status_color_class" class="sl-cnt">
        <i :class="props.status" />
    </div>
</template>

<style scoped>
.sl-cnt {
    min-width: 10pt;
}
.no-bus::before {
    font: var(--fa-font-regular);
    /* content: "\f059"; */
    /* content: "\e4e3"; */
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

.ready-to-leave:before {
    font: var(--fa-font-solid);
    content: "\f0f3";
}

.on-the-road:before {
    font: var(--fa-font-solid);
    content: "\f4d7";
}

</style>