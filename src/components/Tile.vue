<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
    title: String,
    bufor: Boolean,
})

const imagePath = computed(() => {
    if(props.bufor)
        return "src/assets/B20.svg"
    else
        return "src/assets/D15.svg"
})
</script>

<template>
    <div class="tile">
        <!-- <div class="ripple" /> -->
        <img :src="imagePath" />
        <h3>{{ title }}</h3>
    </div>
</template>

<style scoped>
.tile {
    background-color: var(--vt-c-black-soft);
    border-width: 0;
    border-radius: 3pt;
    padding: 16pt;
    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 4pt;
    align-items: center;
    justify-content: space-between;
}

.ripple {
    animation: growAndFade 1s ease-out;
    background-color: dodgerblue;
    border-radius: 50%;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
}

@keyframes growAndFade {
    0% {
        opacity: .25;
        transform: scale(0);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}

img {
    width: 60pt;
}

</style>