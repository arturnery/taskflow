# TaskFlow - Gerenciamento de Tarefas

Um aplicativo full-stack moderno para gerenciamento de tarefas com autenticação de usuários, interface responsiva e arquitetura escalável.

## 📋 Visão Geral

**TaskFlow** é uma aplicação web completa que permite aos usuários criar, organizar, editar e deletar tarefas de forma intuitiva. O projeto foi desenvolvido com as melhores práticas de desenvolvimento moderno, incluindo autenticação segura, testes unitários e código limpo.

### Características Principais

- **Autenticação Segura:** Sistema de login/registro com OAuth
- **CRUD Completo:** Criar, ler, atualizar e deletar tarefas
- **Prioridades:** Organize tarefas por níveis de prioridade (Baixa, Média, Alta)
- **Status de Conclusão:** Marque tarefas como concluídas
- **Interface Responsiva:** Funciona perfeitamente em desktop, tablet e mobile
- **Testes Unitários:** Cobertura de testes com Vitest
- **Arquitetura Moderna:** tRPC para comunicação client-server type-safe

## 🛠️ Stack Tecnológico

### Front-end
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **TailwindCSS 4** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **tRPC** - RPC type-safe para comunicação com o servidor
- **React Query** - Gerenciamento de estado e cache

### Back-end
- **Node.js** - Runtime JavaScript server-side
- **Express** - Framework web minimalista
- **tRPC** - RPC type-safe para APIs
- **Drizzle ORM** - ORM type-safe para bancos de dados
- **Zod** - Validação de dados com schemas TypeScript

### Banco de Dados
- **MySQL/TiDB** - Banco de dados relacional (padrão do template)
- **Drizzle Kit** - Ferramentas de migração e schema management

### Testes
- **Vitest** - Framework de testes rápido e moderno
- **12 testes unitários** cobrindo autenticação e operações de tarefas

## 📁 Estrutura do Projeto

```
taskflow/
├── client/                    # Front-end React
│   ├── src/
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── lib/              # Utilitários e configurações
│   │   ├── App.tsx           # Componente raiz
│   │   └── main.tsx          # Ponto de entrada
│   ├── public/               # Arquivos estáticos
│   └── index.html            # HTML principal
├── server/                    # Back-end Node.js/Express
│   ├── routers.ts            # Definição das rotas tRPC
│   ├── db.ts                 # Funções de acesso ao banco de dados
│   ├── tasks.test.ts         # Testes unitários
│   └── _core/                # Configurações internas
├── drizzle/                   # Schema e migrações do banco de dados
│   ├── schema.ts             # Definição das tabelas
│   └── migrations/           # Histórico de migrações
├── package.json              # Dependências do projeto
├── tsconfig.json             # Configuração TypeScript
└── README.md                 # Este arquivo
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm como gerenciador de pacotes
- Conta no GitHub (para clonar o repositório)

### Instalação Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/arturnery/taskflow.git
   cd taskflow
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```
   DATABASE_URL=seu_database_url_aqui
   JWT_SECRET=sua_chave_secreta_aqui
   VITE_APP_ID=seu_app_id
   OAUTH_SERVER_URL=url_oauth_server
   VITE_OAUTH_PORTAL_URL=url_oauth_portal
   ```

4. **Execute as migrações do banco de dados:**
   ```bash
   pnpm db:push
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

   A aplicação estará disponível em `http://localhost:3000`

## 📚 Guia de Uso

### Autenticação

1. Acesse a página inicial do TaskFlow
2. Clique em "Sign In to Get Started"
3. Faça login com suas credenciais
4. Você será redirecionado para o dashboard

### Gerenciando Tarefas

**Criar uma Tarefa:**
- Digite o título da tarefa no campo "Enter task title..."
- Selecione a prioridade (Baixa, Média, Alta)
- Clique em "Add Task" ou pressione Enter

**Editar uma Tarefa:**
- Clique no ícone de lápis (✏️) na tarefa
- Modifique o título
- Clique em "Save" para salvar as alterações

**Marcar como Concluída:**
- Clique no checkbox à esquerda da tarefa
- A tarefa será marcada com strikethrough

**Deletar uma Tarefa:**
- Clique no ícone de lixeira (🗑️) na tarefa
- A tarefa será removida imediatamente

## 🧪 Testes

O projeto inclui testes unitários abrangentes para garantir a qualidade do código.

**Executar os testes:**
```bash
pnpm test
```

**Resultado esperado:**
```
✓ server/auth.logout.test.ts (1 test)
✓ server/tasks.test.ts (11 tests)
Test Files  2 passed (2)
Tests  12 passed (12)
```

Os testes cobrem:
- Autenticação e logout
- Listagem de tarefas
- Criação de tarefas com validação
- Atualização de tarefas
- Deleção de tarefas
- Verificação de autorização

## 🔒 Segurança

- **Autenticação OAuth:** Integração segura com provedores de identidade
- **Validação de Dados:** Todas as entradas são validadas com Zod
- **Autorização:** Verificação de propriedade de tarefas (usuário só acessa suas próprias tarefas)
- **Variáveis de Ambiente:** Credenciais sensíveis nunca são commitadas

## 📊 Arquitetura

### Fluxo de Dados

```
Cliente (React)
    ↓
tRPC Client
    ↓
Express Server
    ↓
Drizzle ORM
    ↓
MySQL/TiDB Database
```

### Rotas tRPC Disponíveis

| Rota | Método | Descrição |
|------|--------|-----------|
| `tasks.list` | Query | Listar todas as tarefas do usuário |
| `tasks.get` | Query | Obter uma tarefa específica |
| `tasks.create` | Mutation | Criar uma nova tarefa |
| `tasks.update` | Mutation | Atualizar uma tarefa existente |
| `tasks.delete` | Mutation | Deletar uma tarefa |
| `auth.me` | Query | Obter informações do usuário autenticado |
| `auth.logout` | Mutation | Fazer logout |

## 🚢 Deploy

### Opções de Deploy Gratuitas

**Front-end (Vercel/Netlify):**
- Vercel: https://vercel.com (recomendado para Next.js/React)
- Netlify: https://netlify.com

**Back-end (Railway/Render):**
- Railway: https://railway.app
- Render: https://render.com

Para um guia completo de deploy, consulte [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

### Passos para Deploy

1. Faça push do código para o GitHub
2. Conecte o repositório ao serviço de deploy
3. Configure as variáveis de ambiente em produção
4. Faça o deploy automático

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão com o banco de dados | `mysql://user:pass@host/db` |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | `sua_chave_secreta_aleatoria` |
| `VITE_APP_ID` | ID da aplicação OAuth | `seu_app_id` |
| `OAUTH_SERVER_URL` | URL do servidor OAuth | `https://oauth.example.com` |
| `VITE_OAUTH_PORTAL_URL` | URL do portal de login OAuth | `https://login.example.com` |

## 🐛 Troubleshooting

**Problema: Erro de conexão com o banco de dados**
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o banco de dados está rodando
- Execute `pnpm db:push` para aplicar as migrações

**Problema: Testes falhando**
- Execute `pnpm install` para garantir que todas as dependências estão instaladas
- Verifique se o banco de dados está disponível
- Execute `pnpm check` para verificar erros de TypeScript

**Problema: Aplicação não inicia**
- Verifique se a porta 3000 está disponível
- Verifique os logs do servidor para mensagens de erro
- Certifique-se de que todas as variáveis de ambiente estão configuradas

## 📈 Melhorias Futuras

- [ ] Adicionar filtros por prioridade e status
- [ ] Implementar datas de vencimento com notificações
- [ ] Adicionar categorias/tags para tarefas
- [ ] Implementar compartilhamento de tarefas entre usuários
- [ ] Adicionar dark mode
- [ ] Implementar sincronização offline
- [ ] Adicionar integração com calendário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👤 Autor

Desenvolvido por **Artur Matoso Viana Nery Silva**

- GitHub: [@arturnery](https://github.com/arturnery)
- LinkedIn: [Artur Matoso](https://www.linkedin.com/in/artur-matoso-nery-84a4971a9/)
- Email: arturnery1997@gmail.com

## 🙏 Agradecimentos

- React e comunidade JavaScript
- Vercel pelo tRPC
- Tailwind Labs pelo TailwindCSS
- Drizzle Team pelo Drizzle ORM
- shadcn/ui pelos componentes

## 📞 Suporte

Se encontrar problemas ou tiver sugestões, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ para demonstrar habilidades em Full Stack Development**
