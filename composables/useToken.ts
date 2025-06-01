export const useToken = () => {
  const token = useCookie('auth_token');

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const getToken = () => token.value;

  const removeToken = () => {
    token.value = null;
  };

  return {
    setToken,
    getToken,
    removeToken
  };
}; 