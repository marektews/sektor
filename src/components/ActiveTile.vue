<script setup>
defineProps(['imagePath', 'label'])
</script>

<template>
    <div class="card">
        <div class="card-body tile">
            <img :src="imagePath" />
            <div class="label">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.tile {
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