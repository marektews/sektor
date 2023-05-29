<script setup>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const props = defineProps({
    terminal: { type: Object, required: true },
})

const emit = defineEmits(['click'])

const imagePath = computed(() => {
    if(props.terminal.buffer)
        return "/B20.svg"
    else
        return "/D15.svg"
})

const router = useRouter()

function on_TileClicked() {
    if(props.terminal.buffer) {
        router.push({
            name: "bufor",
            params: { 
                tid: props.terminal.tid
            }
        })
    }
    else
        emit('click', props.terminal.tid)
}
</script>

<template>
    <div class="terminal-tile" @click="on_TileClicked">
        <img :src="imagePath" />
        <div class="name">{{ terminal.name }}</div>
    </div>
</template>

<style scoped>
.terminal-tile {
    background-color: var(--vt-c-black-soft);
    border-width: 0;
    border-radius: 3pt;
    padding: 18pt;

    min-height: 60pt;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 9pt;
    align-items: center;
}

img {
    height: 2.5rem;
}

.name {
    font-size: 1.4rem;
}
</style>