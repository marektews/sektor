<template>
    <div class="close-btn" @click="$router.push({name: 'home'})" />
</template>

<style scoped>
.close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-image: url('/circle-xmark-solid.svg');
    background-size: cover;
    width: 2rem;
    height: 2rem;
    pointer-events: auto;
}
</style>