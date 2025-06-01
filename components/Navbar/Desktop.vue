<template>
    <div class="flex h-screen bg-gray-900">
      <aside class="w-24 bg-gray-800 h-full flex flex-col items-center py-6 shadow-md transition-transform duration-300 relative">
        <div class="mb-8 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md overflow-hidden">
          <img :src="logoImage" alt="Logo" class="w-full h-full object-cover" />
        </div>
  
        <!-- Links -->
        <div class="flex flex-col space-y-6 flex-grow">
          <NuxtLink
            v-for="link in links"
            :to="link.href"
            class="sidebar-link"
            :class="{ active: isActive(link.href) }">
            <i :class="link.icon" class="text-2xl"></i>
          </NuxtLink>
        </div>
  
        <!-- Avatar e Menu -->
        <div class="mt-auto">
          <Menu :model="avatarMenuItems" :popup="true" ref="avatarMenu" />
          <Avatar
            image="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            size="large"
            shape="circle"
            class="shadow-md cursor-pointer"
            @click="toggleMenu" />
        </div>
      </aside>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import logo from '../../public/logo.png';
  import { useRoute, useRouter } from '#app';
  import { useAuth } from '~/composables/useAuth';
  
  const auth = useAuth();
  const isLoading = ref(false);
  const avatarMenu = ref(null);

  const logout = async () => {
    isLoading.value = true;
    try {
      await auth.logout();
      navigateTo('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const avatarMenuItems = computed(() => {
    if (auth.isAuthenticated.value) {
      return [
        { label: 'Perfil', icon: 'pi pi-user', command: () => navigateTo("/protected/me") },
        { label: 'Sair', icon: 'pi pi-sign-out', command: logout },
      ];
    } else {
      return [
        { label: 'Login', icon: 'pi pi-sign-in', command: () => navigateTo('/login') },
        { label: 'Registrar', icon: 'pi pi-user-plus', command: () => navigateTo('/registro') },
      ];
    }
  });

  const links = [
    { href: '/', icon: 'pi pi-home' },
    { href: 'https://www.linkedin.com', icon: 'pi pi-linkedin' }, 
    { href: 'https://www.github.com', icon: 'pi pi-github' }, 
    { href: 'https://www.instagram.com', icon: 'pi pi-instagram' }, 
  ];
  
  const route = useRoute();
  const router = useRouter();
  const logoImage = logo;
  
  const toggleMenu = (event) => {
    avatarMenu.value.toggle(event);
  };
  
  const isActive = (href) => route.path === href;
  
  onMounted(() => {
    auth.checkAuth();
  });
  
  onUnmounted(() => {

  });
  </script>
  
  <style scoped>
  .sidebar-link {
    @apply text-gray-300 hover:text-gray-100 transition-colors duration-300 p-2 rounded-lg;
  }
  
  .sidebar-link.active {
    @apply text-blue-400 font-bold bg-gray-700;
  }
  
  .mt-auto {
    margin-top: auto;
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  
  .shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  