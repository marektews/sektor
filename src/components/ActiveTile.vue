<script setup>
defineProps(['imagePath', 'label'])
</script>

<template>
    <div class="tile">
        <img :src="imagePath" />
        <div class="label">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.tile {
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

.label {
    font-size: 1.4rem;
}
</style>