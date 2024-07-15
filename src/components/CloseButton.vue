<template>
    <div class="close-btn" @click="$router.push({name: 'home'})">
        <FontAwesomeIcon :icon="faCircleXmark" size="2x" />
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
</script>


<style scoped>
.close-btn {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    width: 2rem;
    height: 2rem;
    pointer-events: auto;
}
</style>