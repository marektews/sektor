<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    sector: { type: Object, required: true },
})

const router = useRouter()

function on_ItemClicked() {
    router.push({
        name: "stan",
        params: {
            sid: props.sector.sid
        }
    })
}
</script>

<template>
    <div class="sector-tile" @click="on_ItemClicked">
        <img src="/D15.svg" />
        <div class="name">{{ sector.name }}</div>
    </div>
</template>

<style scoped>
.sector-tile {
    background-color: var(--vt-c-black-soft);
    border-width: 0;
    border-radius: 3pt;
    padding: 9pt;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 6pt;
    align-items: center;
}

img {
    height: 3rem;
}

.name {
    font-size: 1rem;
}
</style>