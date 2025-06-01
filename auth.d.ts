declare module '#auth-utils' {
    export interface User {
        id: number;
        nome: string;
        email: string;
        senha?: string | undefined;
        telefone?: string | null;
        localizacao?: string | null;
        bio?: string; 
        avatarUrl?: string; 
        criadoEm: Date;
        servicos?: Servico[]; 
        avaliacoes?: Avaliacao[]; 
      }
      
      export interface Servico {
        id: number;
        titulo: string;
        descricao: string;
        tipo: string;
        categoriaId: number;
        categoria: Categoria;
        preco?: number;
        disponibilidade?: Date;
        criadoEm: Date;
        atualizadoEm?: Date;
        usuarioId: number;
        usuario: User; 
        avaliacoes?: Avaliacao[]; 
      }
      
      export interface Categoria {
        id: number;
        nome: string;
        descricao?: string;
        servicos?: Servico[]; 
      }
      
      export interface Avaliacao {
        id: number;
        nota: number;
        comentario?: string;
        data: Date;
        usuarioId: number;
        servicoId: number;
        usuario: User; 
        servico: Servico;
      }
      
  }
  
  export {}