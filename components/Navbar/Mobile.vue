<script setup lang="ts">
import { useRoute } from '#app';
import logo from '../../public/logo.png';

const props = defineProps<{
  isActive: (href: string) => boolean;
}>();

const route = useRoute();

const links = [
  { href: '/', icon: 'pi pi-home' },
  { href: 'https://www.linkedin.com', icon: 'pi pi-linkedin' },
  { href: '/protected/me', icon: 'pi pi-user' },
  { href: 'https://www.instagram.com', icon: 'pi pi-instagram' },
];
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-10 bg-gray-800 text-white flex justify-around p-2">
    <NuxtLink v-for="link in links" :to="link.href" :key="link.href">
      <Button :icon="link.icon" :class="{
        'text-orange-300': props.isActive(link.href),
        'text-white': !props.isActive(link.href)
      }" class="p-button-text" />
    </NuxtLink>
  </div>
</template>

<style scoped>
.bg-beige {
  background-color: #F5F5DC;
}
</style>
