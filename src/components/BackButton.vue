<template>
    <div class="back-btn">
        <FontAwesomeIcon :icon="faCircleChevronLeft" size="2x" />
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped>
.back-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 2.5rem;
    pointer-events: auto;
}
</style>