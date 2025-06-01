import { useAuth } from '../composables/useAuth';

export default defineNuxtPlugin((nuxtApp) => {
  // Registra um hook para executar após a hidratação
  nuxtApp.hook('app:mounted', () => {
    const { checkAuth } = useAuth();
    checkAuth();
  });
}); 