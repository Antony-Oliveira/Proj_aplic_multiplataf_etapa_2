<template>
    <div :class="isDesktop ? 'fixed-navbar' : 'mobile-navbar'">
      <DesktopNavbar v-if="isDesktop" :is-active="isActive" />
      <MobileNavbar v-else :is-active="isActive" />
    </div>
    <div :class="isDesktop ? 'flex-1 ml-20 p-1' : 'flex-1 p-1'">
      <slot /> 
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import DesktopNavbar from './Desktop.vue';
  import MobileNavbar from './Mobile.vue';
  
  const isDesktop = ref(false);
  
  const updateDeviceType = () => {
    isDesktop.value = window.innerWidth >= 768;
  };
  
  onMounted(() => {
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType);
  });
  
  // Gerenciar rota ativa
  const route = useRoute();
  const isActive = (href) => route.path === href;
  </script>
  
  <style scoped>
  .fixed-navbar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 80px;
    background-color: #f3f4f6;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-navbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    .fixed-navbar {
      display: none;
    }
    .mobile-navbar {
      display: block;
    }
  }
  </style>
  