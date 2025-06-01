<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto p-8">
      <div class="bg-white rounded-lg shadow p-6 animate-pulse">
        <div class="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!userData" class="max-w-7xl mx-auto p-8">
      <div class="bg-white rounded-lg shadow p-6">
        <p class="text-center text-gray-600">Usuário não encontrado ou não autenticado.</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto p-8">
      <!-- Profile Info -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-col items-center md:items-start md:flex-row md:justify-between">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <Avatar
              :image="userData.avatarUrl || 'https://via.placeholder.com/150'"
              size="xlarge"
              shape="circle"
              class="w-32 h-32 shadow-sm"
            />
            <div class="text-center md:text-left">
              <h1 class="text-2xl font-bold text-gray-800">{{ userData.nome }}</h1>
              <p class="text-gray-600 mb-4">{{ userData.email }}</p>
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex items-center gap-2">
                  <i class="pi pi-phone text-blue-600"></i>
                  <span class="text-gray-600">{{ userData.telefone || "(85) 99154-0951" }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="pi pi-map-marker text-blue-600"></i>
                  <span class="text-gray-600">{{ userData.localizacao || "Fortaleza, CE" }}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            icon="pi pi-pencil"
            label="Editar Perfil"
            class="p-button-outlined mt-4 md:mt-0"
            @click="openEditDialog"
          />
        </div>

        <!-- Estatísticas -->
        <div class="mt-8 border-t pt-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
          <div class="flex gap-8">
            <div>
              <p class="text-2xl font-bold text-blue-600">{{ userData.servicos?.length || 3 }}</p>
              <p class="text-sm text-gray-600">Serviços</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-blue-600">{{ 0 }}</p>
              <p class="text-sm text-gray-600">Avaliações</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Serviços -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 flex justify-between items-center border-b">
          <h2 class="text-xl font-bold text-gray-800">Meus Serviços</h2>
          <Button
            label="Novo Serviço"
            icon="pi pi-plus"
            class="p-button-primary"
            @click="openServiceDialog"
          />
        </div>

        <div class="p-6">
          <div v-if="userData.servicos?.length" class="grid gap-6">
            <div 
              v-for="servico in userData.servicos" 
              :key="servico.id" 
              class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="pi pi-briefcase text-blue-600"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ servico.titulo }}</h3>
                  <p class="text-sm text-gray-500 mb-2">{{ servico.tipo }}</p>
                  <p class="text-blue-600 font-semibold">
                    {{ servico.preco ? `R$ ${servico.preco.toFixed(2)}` : "Sob consulta" }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">
                  {{ categorias.find(cat => cat.id === servico.categoriaId)?.nome }}
                </span>
                <Button
                  icon="pi pi-pencil"
                  class="p-button-text p-button-rounded"
                  @click="editService(servico)"
                />
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <i class="pi pi-inbox text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-600">Você ainda não possui serviços cadastrados.</p>
            <p class="text-gray-500 text-sm mt-2">Clique em "Novo Serviço" para começar!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modais -->
    <Dialog
      v-model:visible="editUserDialog"
      modal
      :style="{ width: '500px', maxWidth: '95vw' }"
      class="p-fluid modern-dialog"
      :header="false"
      :closable="false"
    >
      <div class="bg-gray-900 p-6 -m-4 mb-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white">Editar Perfil</h2>
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-text p-button-plain"
          @click="editUserDialog = false"
        />
      </div>

      <form @submit.prevent="updateUser" class="space-y-6 px-2">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Nome</label>
          <InputText 
            v-model="form.nome" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
          <InputMask 
            v-model="form.telefone" 
            mask="(99) 99999-9999" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Biografia</label>
          <Textarea 
            v-model="form.bio" 
            rows="4" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
          />
        </div>
        
        <div class="flex justify-end gap-3 pt-4">
          <Button
            label="Cancelar"
            class="p-button-text text-gray-400 hover:text-white"
            @click="editUserDialog = false"
            type="button"
          />
          <Button
            label="Salvar"
            class="p-button-primary"
            type="submit"
          />
        </div>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="newServiceDialog"
      modal
      :style="{ width: '500px', maxWidth: '95vw' }"
      class="p-fluid modern-dialog"
      :header="false"
      :closable="false"
    >
      <div class="bg-gray-900 p-6 -m-4 mb-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white">Novo Serviço</h2>
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-text p-button-plain"
          @click="newServiceDialog = false"
        />
      </div>

      <form @submit.prevent="createService" class="space-y-6 px-2">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Título</label>
          <InputText 
            v-model="newService.titulo" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Tipo</label>
          <InputText 
            v-model="newService.tipo" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Descrição</label>
          <Textarea 
            v-model="newService.descricao" 
            rows="4" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Preço</label>
          <InputNumber
            v-model="newService.preco"
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            class="w-full bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
          <Select
            v-model="newService.categoriaId"
            :options="categorias"
            optionLabel="nome"
            optionValue="id"
            placeholder="Selecione uma categoria"
            class="w-full bg-gray-800 border-gray-700 text-white"
            :filter="true"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value">
                {{ categorias.find((cat) => cat.id === slotProps.value)?.nome }}
              </div>
              <span v-else class="text-gray-500">{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div>{{ slotProps.option.nome }}</div>
            </template>
          </Select>
        </div>

        <div class="flex justify-end gap-3">
          <Button
            label="Cancelar"
            class="p-button-text text-gray-400 hover:text-white"
            @click="newServiceDialog = false"
            type="button"
          />
          <Button
            label="Criar"
            class="p-button-primary"
            type="submit"
          />
        </div>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="editServiceDialog"
      modal
      :style="{ width: '500px', maxWidth: '95vw' }"
      class="p-fluid modern-dialog"
      :header="false"
      :closable="false"
    >
      <div class="bg-gray-900 p-6 -m-4 mb-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-white">Editar Serviço</h2>
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-text p-button-plain"
          @click="editServiceDialog = false"
        />
      </div>

      <form @submit.prevent="updateService" class="space-y-6 px-2">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Título</label>
          <InputText 
            v-model="editServiceData.titulo" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Tipo</label>
          <InputText 
            v-model="editServiceData.tipo" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Descrição</label>
          <Textarea 
            v-model="editServiceData.descricao" 
            rows="4" 
            class="w-full bg-gray-800 border-gray-700 text-white" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Preço</label>
          <InputNumber
            v-model="editServiceData.preco"
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            class="w-full bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
          <Select
            v-model="editServiceData.categoriaId"
            :options="categorias"
            optionLabel="nome"
            optionValue="id"
            placeholder="Selecione uma categoria"
            class="w-full bg-gray-800 border-gray-700 text-white"
            :filter="true"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value">
                {{ categorias.find((cat) => cat.id === slotProps.value)?.nome }}
              </div>
              <span v-else class="text-gray-500">{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div>{{ slotProps.option.nome }}</div>
            </template>
          </Select>
        </div>

        <div class="flex justify-between">
          <Button
            label="Excluir"
            icon="pi pi-trash"
            class="p-button-danger p-button-outlined"
            type="button"
            @click="deleteService"
          />
          <div class="flex gap-3">
            <Button
              label="Cancelar"
              class="p-button-text text-gray-400 hover:text-white"
              @click="editServiceDialog = false"
              type="button"
            />
            <Button
              label="Salvar"
              class="p-button-primary"
              type="submit"
            />
          </div>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuth } from '~/composables/useAuth';
import { userService } from '~/utils/services/userService';
import { serviceService } from '~/utils/services/serviceService';
import { categoryService } from '~/utils/services/categoryService';

useHead({
  title: "Meu perfil",
})

definePageMeta({
  middleware: "auth",
});

const auth = useAuth();
const loading = ref(true);
const userData = ref(null);
const editUserDialog = ref(false);
const newServiceDialog = ref(false);
const editServiceDialog = ref(false);
const categorias = ref([]);
const form = reactive({ nome: "", telefone: "", bio: "" });
const newService = reactive({
  titulo: "",
  descricao: "",
  tipo: "",
  preco: null,
  disponibilidade: new Date(),
  usuarioId: null,
  categoriaId: null,
});
const editServiceData = reactive({
  id: null,
  titulo: "",
  descricao: "",
  tipo: "",
  preco: null,
  categoriaId: null,
});

const fetchUserServices = async (userId) => {
  try {
    return await serviceService.getByUserId(userId);
  } catch (error) {
    console.error("Erro ao buscar serviços do usuário:", error);
    return [];
  }
};

const fetchUser = async () => {
  try {
    await auth.checkAuth();
    if (auth.user.value) {
      userData.value = {
        ...auth.user.value,
        servicos: []
      };
      form.nome = userData.value.nome || '';
      form.telefone = userData.value.telefone || '';
      form.bio = userData.value.bio || '';

      // Buscar serviços do usuário
      userData.value.servicos = await fetchUserServices(auth.user.value.id);
    }
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);
  } finally {
    loading.value = false;
  }
};

const fetchCategorias = async () => {
  try {
    categorias.value = await categoryService.getAll();
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    alert(error.message || "Erro ao carregar categorias. Tente novamente.");
  }
};

const updateUser = async () => {
  try {
    const response = await userService.update(auth.user.value.id, form);

    // Manter os serviços ao atualizar os dados do usuário
    const servicos = userData.value.servicos;
    Object.assign(userData.value, response);
    userData.value.servicos = servicos;
    
    editUserDialog.value = false;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    alert(error.message || "Erro ao atualizar usuário. Tente novamente.");
  }
};

const createService = async () => {
  // Validação dos campos
  const errors = [];
  
  if (!newService.titulo?.trim()) {
    errors.push("O título é obrigatório");
  } else if (newService.titulo.length < 3) {
    errors.push("O título deve ter pelo menos 3 caracteres");
  }

  if (!newService.descricao?.trim()) {
    errors.push("A descrição é obrigatória");
  } else if (newService.descricao.length < 10) {
    errors.push("A descrição deve ter pelo menos 10 caracteres");
  }

  if (!newService.tipo?.trim()) {
    errors.push("O tipo é obrigatório");
  }

  if (newService.preco === null || newService.preco < 0) {
    errors.push("O preço deve ser maior ou igual a zero");
  }

  if (!newService.categoriaId) {
    errors.push("A categoria é obrigatória");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  try {
    // Garantir que o usuarioId está definido
    newService.usuarioId = auth.user.value.id;

    const response = await serviceService.create(newService);

    // Garantir que o array de serviços existe
    if (!userData.value.servicos) {
      userData.value.servicos = [];
    }
    
    userData.value.servicos.push(response);
    newServiceDialog.value = false;

    // Limpar o formulário
    newService.titulo = "";
    newService.descricao = "";
    newService.tipo = "";
    newService.preco = null;
    newService.categoriaId = null;

    alert("Serviço criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    alert(error.message || "Erro ao criar serviço. Tente novamente.");
  }
};

const updateService = async () => {
  try {
    const response = await serviceService.update(editServiceData.id, editServiceData);
    
    const index = userData.value.servicos.findIndex(
      (s) => s.id === editServiceData.id
    );
    if (index !== -1) {
      userData.value.servicos[index] = response;
    }
    editServiceDialog.value = false;
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    alert(error.message || "Erro ao atualizar serviço. Tente novamente.");
  }
};

const deleteService = async () => {
  try {
    const confirmed = confirm("Tem certeza que deseja excluir este serviço?");
    if (!confirmed) return;

    await serviceService.delete(editServiceData.id);

    const index = userData.value.servicos.findIndex(
      (s) => s.id === editServiceData.id
    );
    if (index !== -1) {
      userData.value.servicos.splice(index, 1); 
    }

    alert("Serviço excluído com sucesso.");
    editServiceDialog.value = false;
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    alert(error.message || "Erro ao excluir serviço. Tente novamente.");
  }
};

const editService = (servico) => {
  editServiceData.id = servico.id;
  editServiceData.titulo = servico.titulo;
  editServiceData.descricao = servico.descricao;
  editServiceData.tipo = servico.tipo;
  editServiceData.preco = servico.preco;
  editServiceData.categoriaId = servico.categoriaId;
  editServiceDialog.value = true;
};

const openEditDialog = () => {
  form.nome = userData.value.nome;
  form.telefone = userData.value.telefone;
  form.bio = userData.value.bio;
  editUserDialog.value = true;
};

const openServiceDialog = () => {
  newService.titulo = "";
  newService.descricao = "";
  newService.preco = null;
  newServiceDialog.value = true;
};

onMounted(() => {
  fetchUser();
  fetchCategorias();
});
</script>

<style scoped>
textarea {
  resize: none;
}

:deep(.modern-dialog) {
  @apply bg-gray-900 text-white;
  border-radius: 1rem;
  overflow: hidden;
}

:deep(.modern-dialog .p-dialog-content) {
  @apply bg-gray-900 text-white;
  padding: 1rem !important;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px #93C5FD;
}

:deep(.p-button.p-button-primary) {
  background: #3B82F6;
}

:deep(.p-button.p-button-primary:hover) {
  background: #2563EB;
}

:deep(.p-button.p-button-plain) {
  @apply text-white;
}

:deep(.p-button.p-button-plain:hover) {
  @apply bg-gray-800;
}

:deep(.p-dropdown-panel) {
  @apply bg-gray-900 border-gray-700;
}

:deep(.p-dropdown-item) {
  @apply text-white;
}

:deep(.p-dropdown-item:hover) {
  @apply bg-gray-800;
}

:deep(.p-inputnumber-input) {
  @apply bg-gray-800 border-gray-700 text-white;
}

:deep(.p-dropdown) {
  @apply bg-gray-800 border-gray-700;
}

:deep(.p-dropdown-trigger) {
  @apply text-gray-400;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  @apply border-blue-500;
  box-shadow: 0 0 0 2px #93C5FD;
}
</style>
