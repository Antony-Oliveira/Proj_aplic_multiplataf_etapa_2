import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuth, isAuthenticated } = useAuth();
  
  // Se a rota requer autenticação
  if (to.path.startsWith('/protected')) {
    // Tenta validar a autenticação atual
    await checkAuth();
    
    // Se após a validação ainda não está autenticado, redireciona para login
    if (!isAuthenticated.value) {
      return navigateTo({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  }
});