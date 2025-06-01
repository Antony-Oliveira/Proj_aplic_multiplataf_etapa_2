# Conecta Fortaleza - Frontend (Nuxt 3)

Este é o projeto frontend do Conecta Fortaleza, desenvolvido com Nuxt 3, Vue 3, PrimeVue e TailwindCSS.

## Requisitos

- Node.js 18.x ou superior
- npm
- Conexão com os microserviços (auth-service e database-service)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/Antony-Oliveira/Proj_aplic_multiplataf_etapa_2.git ConectaFortaleza
cd ConectaFortaleza
```

2. Instale as dependências:
```bash
npm run install-all

```



## Desenvolvimento

Para iniciar o servidor de desenvolvimento no app Nuxt:

```bash
npm run dev
```

Iniciar o micro serviço de Database:
```bash
cd .\database-service\
npm run dev
```
Iniciar o micro serviço de Autenticação:
```bash
cd .\auth-service\
npm run dev
```
O aplicativo estará disponível em `http://localhost:3000`, os micro serviços nas portas 3001 e 3002.

