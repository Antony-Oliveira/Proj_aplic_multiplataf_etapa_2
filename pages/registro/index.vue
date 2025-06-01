<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="min-h-screen flex">
      <!-- Lado Esquerdo - Área de Boas-vindas -->
      <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 justify-center items-center p-12">
        <div class="max-w-lg">
          <h1 class="text-4xl font-bold text-white mb-4">
            Crie sua conta no Conecta Fortaleza
          </h1>
          <p class="text-blue-100 text-lg">
            Junte-se à nossa comunidade e descubra os melhores serviços da cidade. Cadastre-se agora mesmo!
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
            <h2 class="text-2xl font-bold text-gray-900">Criar nova conta</h2>
            <p class="mt-2 text-gray-600">Preencha seus dados para começar</p>
          </div>

          <!-- Mensagem de sucesso -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            <p>{{ successMessage }}</p>
          </div>

          <!-- Mensagem de erro -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{{ errorMessage }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Grid de 2 colunas para campos menores -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="nome" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                <div class="mt-1">
                  <InputText
                    v-model="form.nome"
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                  <InputText
                    v-model="form.email"
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Senha em linha única por ser campo importante -->
            <div>
              <label for="senha" class="block text-sm font-medium text-gray-700">Senha</label>
              <div class="mt-1">
                <Password
                  v-model="form.senha"
                  id="senha"
                  toggleMask
                  placeholder="Digite sua senha"
                  class="w-full"
                  :pt="{
                    root: { class: 'w-full' },
                    input: { class: 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' }
                  }"
                  required
                  promptLabel="Digite uma senha forte" 
                  weakLabel="Muito simples" 
                  mediumLabel="Quase boa..." 
                  strongLabel="Uma ótima senha!"
                />
              </div>
            </div>

            <!-- Grid de 2 colunas para campos de contato -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="telefone" class="block text-sm font-medium text-gray-700">Telefone</label>
                <div class="mt-1">
                  <InputMask
                    v-model="form.telefone"
                    id="telefone"
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    mask="(99) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label for="localizacao" class="block text-sm font-medium text-gray-700">Localização</label>
                <div class="mt-1">
                  <InputText
                    v-model="form.localizacao"
                    id="localizacao"
                    type="text"
                    placeholder="Digite sua localização"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- Botão em linha única -->
            <div class="pt-4">
              <Button
                type="submit"
                :loading="loading"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {{ loading ? 'Registrando...' : 'Criar conta' }}
              </Button>
            </div>
          </form>

          <!-- Links -->
          <div class="mt-8 space-y-4">
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Já tem uma conta?
                <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                  Entre aqui
                </NuxtLink>
              </p>
            </div>
            <div class="text-center">
              <a href="/" class="text-sm text-gray-600 hover:text-gray-500">
                Voltar para a página inicial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

useHead({
  title: "Registro",
  meta: [
    {
      name: "description",
      content: "Crie uma conta na plataforma Conecta Fortaleza"
    }
  ],
});

const router = useRouter();
const auth = useAuth();
const loading = ref(false);

const form = ref({
  nome: '',
  email: '',
  senha: '',
  telefone: '',
  localizacao: '',
});

const successMessage = ref(null);
const errorMessage = ref(null);

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    await auth.register({
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      telefone: form.value.telefone,
      localizacao: form.value.localizacao
    });
    successMessage.value = "Cadastro realizado com sucesso!";
    
    window.location.href = '/protected/me';
  } catch (error) {
    errorMessage.value = error?.message || "Erro ao realizar o cadastro.";
  } finally {
    loading.value = false;
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
