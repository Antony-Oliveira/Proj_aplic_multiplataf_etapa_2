// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  ssr: true,
  schemaOrg: {
    identity: {
      '@type': 'Person',
      name: 'Antony Caíque',
      image: './assets/usermock.png',
      description: 'Desenvolvedor de software',
      url: 'https://github.com/Antony-Oliveira',
      sameAs: [
        'https://github.com/Antony-Oliveira',
        'https://www.linkedin.com/in/antonycaique/'
      ]
    }
  },
  site: {
    url: 'https://conecta-fortaleza.vercel.app',
    name: 'Conecta Fortaleza',
  },
  app: {
    pageTransition: {name: "page", mode: "out-in"}, 
    head: {
      title: 'ConectaFortaleza',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Conectando profissionais e clientes em Fortaleza' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  sitemap: {
    sitemapName: 'sitesmap.xml', 
    xsl: false,
    urls: async () => {
      try {
        const response = await fetch('https://svlss-cf-sp-get-ids.vercel.app/api/hello');
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar URLs: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.ids)) {
          return data.ids.map((service : any) => ({
            loc: `/servico/${service.id}`, 
            lastmod: new Date().toISOString(), 
            priority: 0.7, 
          }));
        } else {
          throw new Error('Formato de resposta inesperado');
        }
      } catch (error) {
        console.error('Erro ao gerar sitemap:', error);
        return [];
      }
    }
  },
  robots: {
    disallow: ['/protected/me'],
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['./global.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@primevue/nuxt-module',
    'nuxt-auth-utils',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    },
    components: {
      include: ['Button', 'InputText', 'Password', 'Toast', 'ConfirmDialog']
    }
  },
});