# TaskFlow - TODO List

## Fase 1: Configuração Inicial
- [x] Criar estrutura de pastas (backend, frontend, docker)
- [x] Configurar schema do banco de dados (users, tasks)
- [x] Criar arquivo docker-compose.yml para PostgreSQL
- [x] Configurar variáveis de ambiente (.env)

## Fase 2: Back-end (Node.js/Express)
- [x] Inicializar projeto Node.js com Express
- [x] Configurar conexão com PostgreSQL (Drizzle ORM)
- [x] Implementar autenticação (JWT) - Manus OAuth
- [x] Criar rotas de autenticação (registro, login) - Manus OAuth
- [x] Implementar CRUD de tarefas (GET, POST, PUT, DELETE)
- [x] Adicionar validação de dados com Zod
- [x] Criar testes unitários com Vitest
- [x] Documentar API com comentários

## Fase 3: Front-end (React/TypeScript)
- [x] Inicializar projeto React com Vite e TypeScript
- [x] Configurar TailwindCSS para estilização
- [x] Criar componentes base (Button, Input, Card, etc.) - shadcn/ui
- [x] Implementar páginas de autenticação (Login, Registro) - Manus OAuth
- [x] Criar página principal de tarefas (Dashboard)
- [x] Implementar CRUD de tarefas na UI
- [x] Integrar com API back-end (tRPC)
- [x] Adicionar gerenciamento de estado (tRPC + React Query)
- [x] Implementar responsividade
- [x] Adicionar tratamento de erros e loading states

## Fase 4: Dockerização
- [ ] Criar Dockerfile para back-end (Node.js)
- [ ] Criar Dockerfile para front-end (Node.js build)
- [ ] Configurar docker-compose.yml completo
- [ ] Testar containers localmente
- [ ] Configurar volumes para desenvolvimento

## Fase 5: Deploy
- [ ] Deploy do back-end em Railway/Render
- [ ] Deploy do front-end em Vercel/Netlify
- [ ] Configurar variáveis de ambiente em produção
- [ ] Testar fluxo completo em produção
- [ ] Configurar CI/CD (GitHub Actions)

## Fase 6: Documentação
- [ ] Escrever README.md completo
- [ ] Documentar arquitetura do projeto
- [ ] Incluir instruções de setup local
- [ ] Documentar endpoints da API
- [ ] Adicionar guia de contribuição

## Bugs e Melhorias Futuras
- [ ] (A ser preenchido durante o desenvolvimento)
