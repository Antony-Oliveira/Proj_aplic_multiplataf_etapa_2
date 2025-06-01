<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Hero Section com Ondas -->
    <section class="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      <div class="container mx-auto px-4 sm:px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
            Bem-vindo ao Conecta Fortaleza
          </h1>
          <p class="text-xl sm:text-2xl text-blue-100 mb-12 animate-fade-in-delay leading-relaxed">
            Somos o seu portal para encontrar <strong class="text-white">serviços de qualidade em Fortaleza</strong>, conectando pessoas e oportunidades.
          </p>
          <NuxtLink :to="loggedIn ? '/protected/me' : '/login'" class="inline-block animate-bounce-subtle">
            <Button 
              label="Comece Agora" 
              icon="pi pi-arrow-right"
              class="p-button-rounded p-button-lg bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg" 
            />
          </NuxtLink>
        </div>
      </div>
      <!-- Ondas decorativas -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="waves-parallax">
            <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use href="#wave" x="48" y="7" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </section>

    <!-- Seção de Serviços -->
    <section class="container mx-auto py-16 px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Serviços em Destaque</h2>
        <div class="flex items-center gap-3">
          <Button 
            icon="pi pi-filter" 
            label="Filtrar" 
            class="p-button-outlined p-button-secondary" 
            v-tooltip.bottom="'Em breve'"
          />
          <Button 
            icon="pi pi-sort-alt" 
            label="Ordenar" 
            class="p-button-outlined p-button-secondary"
            v-tooltip.bottom="'Em breve'"
          />
        </div>
      </div>

      <!-- Estado de Carregamento -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" 
          class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-[280px]">
          <div class="animate-pulse h-full flex flex-col">
            <div class="h-6 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded-lg w-1/2 mb-4"></div>
            <div class="h-[72px] bg-gray-200 rounded-lg mb-4"></div>
            <div class="mt-auto pt-4 border-t">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                  <div>
                    <div class="h-4 bg-gray-200 rounded-lg w-24 mb-1"></div>
                    <div class="h-5 bg-gray-200 rounded-lg w-20"></div>
                  </div>
                </div>
                <div class="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de Serviços -->
      <div v-else-if="servicos?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="servico in servicos" :key="servico.id"
          class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[280px]">
          <!-- Cabeçalho do Card -->
          <div class="flex justify-between items-start">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                {{ servico.titulo }}
              </h3>
              <div class="flex items-center">
                <i class="pi pi-tag text-blue-500 mr-2"></i>
                <span class="text-sm text-gray-600 truncate">{{ servico.categoria.nome }}</span>
              </div>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shrink-0 ml-2" 
                  :class="servico.tipo === 'Presencial' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
              {{ servico.tipo }}
            </span>
          </div>

          <!-- Descrição -->
          <div class="mt-4 h-[72px]">
            <p class="text-gray-600 line-clamp-3">{{ servico.descricao }}</p>
          </div>

          <!-- Preço e Prestador -->
          <div class="mt-auto pt-4 border-t">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 min-w-0">
                <Avatar :image="mockLogo" class="shrink-0" style="width: 2.5rem; height: 2.5rem;" />
                <div class="overflow-hidden">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ servico.usuario.nome }}</p>
                  <p class="text-lg font-bold text-blue-600">
                    {{ servico.preco ? `R$ ${servico.preco.toFixed(2)}` : "Sob consulta" }}
                  </p>
                </div>
              </div>
              <NuxtLink :to="`/servico/${servico.id}`" class="shrink-0">
                <Button 
                  icon="pi pi-arrow-right"
                  class="p-button-rounded p-button-outlined" 
                  v-tooltip.left="'Ver detalhes'"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado Vazio -->
      <div v-else class="text-center py-16 bg-white rounded-xl shadow-md">
        <i class="pi pi-inbox text-5xl text-gray-400 mb-4"></i>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">Nenhum serviço encontrado</h3>
        <p class="text-gray-500 mb-8">Seja o primeiro a oferecer um serviço!</p>
        <Button 
          label="Criar Serviço" 
          icon="pi pi-plus"
          class="p-button-primary" 
          @click="$router.push('/protected/me')"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
useSchemaOrg([
  defineWebPage({
    name: 'Conecta Fortaleza',
    description: 'Conectando pessoas a serviços de qualidade na nossa cidade de Fortaleza.',
    url: 'https://conecta-fortaleza.vercel.app',
    breadcrumb: {
      itemListElement: [
        { name: 'Home', item: 'https://conecta-fortaleza.vercel.app' , position: 1 }
      ]
    }
  }),
  defineWebSite({
    name: 'Conecta Fortaleza',
    description: 'Conectando pessoas a serviços de qualidade na nossa cidade de Fortaleza.',
    url: 'https://conecta-fortaleza.vercel.app',
    publisher: {
      name: 'Conecta Fortaleza',
      logo: 'https://conecta-fortaleza.vercel.app/logo-removebg-preview.png'
    }
  })
])

import { ref, onMounted } from "vue";
import mockLogo from "~/assets/usermock.png";
import logo from '/logo-removebg-preview.png'

const { loggedIn } = useUserSession();

useHead({
  title: "Conecta Fortaleza",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: logo,
    },
    {
      rel: 'canonical',
      href: 'https://conecta-fortaleza.vercel.app'
    }
  ],
  meta: [
    {
      name: "description",
      content: "Conectando pessoas a serviços de qualidade na nossa cidade de Fortaleza.",
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:description',
      content: 'Descubra os melhores serviços e soluções em Fortaleza. Conectando pessoas e oportunidades!',
    },
    {
      property: 'og:image',
      content: 'https://conecta-fortaleza.vercel.app/logo-removebg-preview.png',
    },
    {
      property: 'og:url',
      content: 'https://conecta-fortaleza.vercel.app',
    },
    {
      name: 'twitter:description',
      content: 'Conectando pessoas a serviços de qualidade na cidade de Fortaleza!',
    },
    {
      name: 'twitter:image',
      content: 'https://conecta-fortaleza.vercel.app/logo-removebg-preview.png',
    }
  ],
})

const servicos = ref([]);
const loading = ref(true);

const loadServicos = async () => {
  try {
    const response = await $fetch("/servicos");
    servicos.value = response.servicos;
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
  } finally {
    loading.value = false; 
  }
}

onMounted(() => {
  loadServicos()
});
</script>

<style>
.bg-pattern {
  background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.animate-bounce-subtle {
  animation: bounceSoft 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
}

.waves-parallax {
  animation: wave 25s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes wave {
  0% {
    transform: translateX(-90px);
  }
  100% {
    transform: translateX(-45px);
  }
}
</style>
