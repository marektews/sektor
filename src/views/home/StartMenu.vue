<script setup>
import ActiveTile from '@/components/ActiveTile.vue'
import { url_buffer_icon, url_sector_icon } from '@/assets/helper'

defineEmits(['buffers', 'terminals'])
</script>

<template>
    <header>Menu</header>
    <div class="items-list">
        <ActiveTile :image-path="url_buffer_icon()" @click="$emit('buffers')">
            Bufory
        </ActiveTile>
        <ActiveTile :image-path="url_sector_icon()" @click="$emit('terminals')">
            Terminale
        </ActiveTile>
    </div>
</template>

<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.items-list {
    display: flex;
    flex-direction: column;
    gap: 12pt;
}
</style>