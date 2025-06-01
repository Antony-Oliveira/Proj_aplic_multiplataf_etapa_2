<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Loading Placeholder -->
      <div v-if="loading" class="max-w-5xl mx-auto">
        <div class="animate-pulse space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="h-8 bg-gray-300 rounded w-3/4"></div>
            <div class="h-24 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="max-w-5xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
          <i class="pi pi-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <p class="text-red-600 text-xl font-medium">
            {{ error.message || "Erro ao carregar serviço" }}
          </p>
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <div v-else-if="servico" class="max-w-5xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Coluna Principal (Esquerda) -->
          <div class="lg:col-span-2">
            <!-- Card do Serviço -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <!-- Header do Serviço -->
              <div class="bg-blue-600 p-6">
                <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {{ servico.titulo }}
                </h1>
                <div class="inline-flex items-center px-3 py-1 bg-blue-500 bg-opacity-50 rounded-full">
                  <i class="pi pi-tag text-white text-sm mr-2"></i>
                  <span class="text-white text-sm">Educação</span>
                </div>
              </div>

              <!-- Detalhes do Serviço -->
              <div class="p-6">
                <p class="text-gray-600 mb-6">
                  {{ servico.descricao }}
                </p>

                <div class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <i class="pi pi-desktop text-blue-600"></i>
                    <span class="text-gray-700 font-medium">Tipo de Serviço:</span>
                    <span class="text-gray-600">{{ servico.tipo }}</span>
                  </div>

                  <div class="flex items-center space-x-2">
                    <i class="pi pi-calendar text-blue-600"></i>
                    <span class="text-gray-700 font-medium">Disponibilidade:</span>
                    <span class="text-gray-600">{{ formatDataDisponibilidade(servico.disponibilidade) }}</span>
                  </div>

                  <div class="flex items-center space-x-2">
                    <i class="pi pi-money-bill text-blue-600"></i>
                    <span class="text-gray-700 font-medium">Valor do Serviço:</span>
                    <span class="text-gray-600">R$ {{ servico.preco?.toFixed(2) || "Sob consulta" }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Avaliações -->
            <div v-if="servico.avaliacoes?.length > 0" class="mt-8">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                Avaliações dos Clientes
                <span class="ml-2 flex items-center text-yellow-500">
                  {{ mediaAvaliacoes }}
                  <i class="pi pi-star-fill ml-1"></i>
                </span>
              </h2>
              
              <div class="space-y-4">
                <div v-for="avaliacao in servico.avaliacoes" :key="avaliacao.id"
                  class="bg-white rounded-xl shadow-lg p-4">
                  <div class="flex items-center space-x-4 mb-3">
                    <Avatar :image="mockLogo" size="large" class="ring-2 ring-gray-100" />
                    <div>
                      <h4 class="font-medium text-gray-900">
                        {{ avaliacao.usuario?.nome }}
                      </h4>
                      <p class="text-sm text-gray-500">
                        {{ formatDataDisponibilidade(avaliacao.data) }}
                      </p>
                    </div>
                  </div>

                  <Rating v-model="avaliacao.nota" :cancel="false" :stars="5" :readonly="true"
                    class="text-lg mb-2" />

                  <p class="text-gray-600">
                    "{{ avaliacao.comentario }}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Coluna Lateral (Direita) -->
          <div class="lg:col-span-1">
            <div class="sticky top-8">
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <div class="text-center mb-6">
                  <Avatar :image="mockLogo" class="ring-2 ring-gray-100 mb-4" size="xlarge" />
                  <h2 class="text-xl font-bold text-gray-900">
                    {{ servico.usuario?.nome }}
                  </h2>
                  <p class="text-sm text-gray-500 mt-1 flex items-center justify-center">
                    <i class="pi pi-check-circle text-green-500 mr-1"></i>
                    Profissional verificado
                  </p>
                </div>

                <div class="space-y-3">
                  <div class="flex items-center text-gray-600">
                    <i class="pi pi-envelope text-blue-600 mr-2"></i>
                    <span class="text-sm">{{ servico.usuario?.email }}</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <i class="pi pi-phone text-blue-600 mr-2"></i>
                    <span class="text-sm">{{ servico.usuario?.telefone }}</span>
                  </div>
                </div>

                <a 
                  v-if="servico.usuario?.telefone"
                  :href="'https://wa.me/55' + servico.usuario.telefone.replace(/\D/g, '')"
                  target="_blank"
                  class="flex items-center justify-center w-full p-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-all mt-6"
                >
                  <i class="pi pi-whatsapp text-xl mr-2"></i>
                  Contatar via WhatsApp
                </a>
              </div>

              <!-- Seção de Avaliação -->
              <div v-if="isAuthenticated && user && servico.usuario && servico.usuario.id !== user.id" 
                class="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">
                  Avalie este Serviço
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">Sua nota:</span>
                    <Rating v-model="nota" :cancel="false" :stars="5" class="text-xl" />
                  </div>

                  <TextArea 
                    v-model="comentario" 
                    placeholder="Compartilhe sua experiência com este serviço..."
                    class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    rows="4"
                  ></TextArea>

                  <Button 
                    @click="enviarAvaliacao"
                    class="w-full p-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all"
                  >
                    Enviar Avaliação
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import mockLogo from "../../assets/usermock.png";
import logo from '../../public/logo.png';
import { useAuth } from '~/composables/useAuth';
import { useToken } from '~/composables/useToken';

const route = useRoute();
const auth = useAuth();
const isAuthenticated = computed(() => auth.isAuthenticated.value);
const user = computed(() => auth.user.value);

const servico = ref(null);
const loading = ref(true);
const nota = ref(0);
const comentario = ref("");

const mediaAvaliacoes = computed(() => {
  if (!servico.value?.avaliacoes?.length) return 0;
  const soma = servico.value.avaliacoes.reduce((acc, av) => acc + av.nota, 0);
  return (soma / servico.value.avaliacoes.length).toFixed(1);
});

const formatDataDisponibilidade = (data) => {
  if (!data) return "Sob consulta";

  const date = new Date(data);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const { data, pending, error } = await useAsyncData(
  'servico', 
  () => $fetch(`/getService/${route.params.id}`)
);

onMounted(async () => {
  try {
    if (error.value) {
      throw error.value;
    }
    
    if (!data.value?.servico) {
      throw new Error("Serviço não encontrado");
    }

    servico.value = data.value.servico;

    if (servico.value) {
      useSchemaOrg([
        defineWebPage({
          name: servico.value.titulo,
          description: servico.value.descricao,
        }),
      ]);

      useSeoMeta({
        title: servico.value.titulo + ' - Conecta Fortaleza',
        description: servico.value.descricao,
        ogTitle: servico.value.titulo,
        ogDescription: servico.value.descricao,
        robots: "index, follow",
      });
    }
  } catch (err) {
    console.error("Erro ao carregar serviço:", err);
    error.value = err;
  } finally {
    loading.value = false;
  }
});

useRobotsRule("index, follow");

const enviarAvaliacao = async () => {
  if (nota.value === 0 || !comentario.value.trim()) {
    alert("Por favor, avalie o serviço e adicione um comentário!");
    return;
  }

  try {
    const { getToken } = useToken();
    const token = getToken();
    
    if (!token) {
      alert("Você precisa estar logado para avaliar o serviço.");
      return;
    }

    const response = await $fetch(`/postAvaliacao`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        servicoId: servico.value.id,
        nota: nota.value,
        comentario: comentario.value,
      },
    });

    if (response.success) {
      alert("Avaliação enviada com sucesso!");
      servico.value.avaliacoes.push(response.novaAvaliacao);
      nota.value = 0;
      comentario.value = "";
    } else {
      alert("Erro ao enviar avaliação.");
    }
  } catch (error) {
    console.error("Erro ao enviar avaliação:", error);
    if (error.status === 401) {
      alert("Sua sessão expirou. Por favor, faça login novamente.");
    } else {
      alert("Erro ao enviar avaliação.");
    }
  }
};
</script>

<style scoped>
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: #EAB308;
}

/* Sticky sidebar */
@media (min-width: 1024px) {
  .sticky {
    position: sticky;
    top: 2rem;
  }
}
</style>
