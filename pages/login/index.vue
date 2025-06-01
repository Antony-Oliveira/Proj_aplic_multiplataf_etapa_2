<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="min-h-screen flex">
      <!-- Lado Esquerdo - Área de Boas-vindas -->
      <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 justify-center items-center p-12">
        <div class="max-w-lg">
          <h1 class="text-4xl font-bold text-white mb-4">
            Bem-vindo de volta ao Conecta Fortaleza
          </h1>
          <p class="text-blue-100 text-lg">
            Entre na sua conta para acessar os melhores serviços da cidade!
          </p>
        </div>
      </div>

      <!-- Lado Direito - Formulário -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <!-- Logo para todas as telas -->
          <div class="text-center mb-8">
            <img src="/logo-removebg-preview.png" alt="Logo" class="h-20 lg:h-24 mx-auto" />
          </div>

          <!-- Cabeçalho do Form -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900">Entrar na sua conta</h2>
            <p class="mt-2 text-gray-600">
              Ou
              <NuxtLink to="/registro" class="font-medium text-blue-600 hover:text-blue-500">
                crie sua conta gratuitamente
              </NuxtLink>
            </p>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{{ error }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <InputText 
                  v-model="form.email" 
                  id="email" 
                  type="email" 
                  autocomplete="email"
                  required
                  placeholder="Digite seu email"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
              <div class="mt-1">
                <Password
                  v-model="form.senha"
                  id="password"
                  toggleMask
                  :feedback="false"
                  placeholder="Digite sua senha"
                  class="w-full"
                  :pt="{
                    root: { class: 'w-full' },
                    input: { class: 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' }
                  }"
                />
              </div>
            </div>

            <div class="pt-4">
              <Button
                type="submit"
                :loading="loading"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </Button>
            </div>
          </form>

          <!-- Links -->
          <div class="mt-8 space-y-4">
            <div class="text-center">
              <a href="/" class="text-sm text-gray-600 hover:text-gray-500">
                Voltar para a página inicial
              </a>
            </div>
          </div>

          <Toast position="top-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const { login, loading, error } = useAuth();

const form = reactive({
  email: '',
  senha: ''
});

const handleSubmit = async () => {
  try {
    await login(form.email, form.senha);
    
    // Redireciona para a página anterior ou para /protected/me
    const redirect = route.query.redirect as string || '/protected/me';
    router.push(redirect);
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
      life: 3000
    });
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.value || 'Erro ao realizar login',
      life: 5000
    });
  }
};
</script>

<style>
.p-password {
  display: block;
  width: 100%;
}

.p-password input {
  width: 100%;
}

/* Ajuste para o ícone de toggle da senha */
.p-password .p-password-toggle-icon {
  right: 1rem;
  color: #6B7280;
}

/* Estilo do botão quando loading */
.p-button.p-button-loading {
  background: #2563EB;
}
</style>