# 🚀 Guia Completo de Deploy - TaskFlow

Este guia fornece instruções passo a passo para fazer o deploy do TaskFlow em produção usando **Vercel** (front-end) e **Railway** (back-end).

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Deploy do Front-end no Vercel](#deploy-do-front-end-no-vercel)
3. [Deploy do Back-end no Railway](#deploy-do-back-end-no-railway)
4. [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
5. [Integração Front-end ↔ Back-end](#integração-front-end--back-end)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de que você tem:

- Conta no GitHub (repositório do TaskFlow já criado)
- Conta no Vercel (https://vercel.com)
- Conta no Railway (https://railway.app)
- Node.js 18+ instalado localmente
- Git configurado com suas credenciais

### Criar Contas (se não tiver)

**Vercel:**
1. Acesse https://vercel.com/signup
2. Clique em "Continue with GitHub"
3. Autorize o Vercel a acessar seus repositórios
4. Pronto! Sua conta está criada

**Railway:**
1. Acesse https://railway.app
2. Clique em "Start Project"
3. Selecione "Deploy from GitHub repo"
4. Autorize o Railway a acessar seus repositórios
5. Pronto! Sua conta está criada

---

## 🌐 Deploy do Front-end no Vercel

### Passo 1: Conectar Repositório ao Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Import Git Repository"**
4. Procure por **"taskflow"** e selecione o repositório `arturnery/taskflow`
5. Clique em **"Import"**

### Passo 2: Configurar Projeto no Vercel

Na tela de configuração do projeto:

**Framework Preset:** Selecione **"Vite"**

**Root Directory:** Deixe em branco (padrão)

**Build Command:** Deixe como padrão ou use:
```bash
pnpm build
```

**Output Directory:** Deixe como padrão (Vercel detectará automaticamente)

**Install Command:** Deixe como padrão ou use:
```bash
pnpm install
```

### Passo 3: Configurar Variáveis de Ambiente (Front-end)

Antes de fazer o deploy, você precisa configurar as variáveis de ambiente. Na tela de configuração do Vercel, clique em **"Environment Variables"** e adicione as seguintes variáveis:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `VITE_APP_ID` | `seu_app_id` | ID da aplicação OAuth |
| `VITE_OAUTH_PORTAL_URL` | `https://seu-backend.railway.app` | URL do servidor OAuth (será configurada depois) |
| `VITE_FRONTEND_FORGE_API_URL` | `https://seu-backend.railway.app` | URL da API do back-end |
| `VITE_FRONTEND_FORGE_API_KEY` | `sua_chave_api` | Chave de API para o front-end |

**Nota:** Você configurará as URLs do back-end após fazer o deploy no Railway.

### Passo 4: Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build ser concluído (geralmente leva 2-3 minutos)
3. Quando terminar, você verá uma mensagem de sucesso com a URL do seu site
4. Clique em **"Visit"** para acessar sua aplicação

**Sua URL será algo como:** `https://taskflow-arturnery.vercel.app`

### Passo 5: Configurar Domínio Personalizado (Opcional)

Se quiser usar um domínio personalizado:

1. No dashboard do Vercel, vá para **"Settings"** → **"Domains"**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `taskflow.com`)
4. Siga as instruções para configurar os registros DNS
5. Aguarde a propagação (pode levar até 48 horas)

---

## 🚂 Deploy do Back-end no Railway

### Passo 1: Conectar Repositório ao Railway

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Procure por **"taskflow"** e selecione o repositório `arturnery/taskflow`
5. Clique em **"Deploy"**

### Passo 2: Configurar Serviço de Banco de Dados

O Railway criará automaticamente um serviço Node.js. Agora você precisa adicionar um banco de dados:

1. No dashboard do Railway, clique em **"+ New"**
2. Selecione **"Database"** → **"MySQL"** (ou **"PostgreSQL"** se preferir)
3. Aguarde o banco de dados ser criado
4. Clique no serviço de banco de dados para ver as credenciais

**Copie a string de conexão (DATABASE_URL)** - você precisará dela na próxima etapa.

### Passo 3: Configurar Variáveis de Ambiente (Back-end)

1. No dashboard do Railway, clique no serviço Node.js
2. Vá para **"Variables"**
3. Adicione as seguintes variáveis de ambiente:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `DATABASE_URL` | `mysql://user:password@host:port/database` | String de conexão do banco de dados (copie do Railway) |
| `JWT_SECRET` | `sua_chave_secreta_aleatoria` | Chave secreta para assinar tokens JWT (gere uma aleatória) |
| `VITE_APP_ID` | `seu_app_id` | ID da aplicação OAuth (mesmo do front-end) |
| `OAUTH_SERVER_URL` | `https://oauth.example.com` | URL do servidor OAuth |
| `VITE_OAUTH_PORTAL_URL` | `https://seu-backend.railway.app` | URL do seu back-end no Railway |
| `BUILT_IN_FORGE_API_URL` | `https://seu-backend.railway.app` | URL da API interna |
| `BUILT_IN_FORGE_API_KEY` | `sua_chave_api` | Chave de API interna |

### Passo 4: Configurar Build e Start Commands

1. No serviço Node.js do Railway, vá para **"Settings"**
2. Configure os seguintes comandos:

**Build Command:**
```bash
pnpm install && pnpm db:push && pnpm build
```

**Start Command:**
```bash
pnpm start
```

**Port:** `3000` (padrão)

### Passo 5: Fazer Deploy

1. Clique em **"Deploy"** ou aguarde o deploy automático
2. Você verá logs em tempo real do build
3. Quando terminar, você verá uma mensagem de sucesso
4. Clique em **"View Logs"** para ver os logs da aplicação

**Sua URL será algo como:** `https://seu-backend-production.up.railway.app`

### Passo 6: Obter URL Pública do Back-end

1. No dashboard do Railway, clique no serviço Node.js
2. Vá para **"Settings"**
3. Procure por **"Public URL"** ou **"Domain"**
4. Copie a URL pública (ex: `https://seu-backend-production.up.railway.app`)

---

## 🔗 Configuração de Variáveis de Ambiente

### Gerar JWT_SECRET Seguro

Para gerar uma chave secreta aleatória e segura, execute no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o resultado e use como `JWT_SECRET`.

### Tabela de Variáveis Completa

| Ambiente | Variável | Exemplo | Onde Obter |
|----------|----------|---------|-----------|
| **Front-end (Vercel)** | `VITE_APP_ID` | `abc123def456` | Seu provedor OAuth |
| | `VITE_OAUTH_PORTAL_URL` | `https://seu-backend.railway.app` | URL do Railway |
| | `VITE_FRONTEND_FORGE_API_URL` | `https://seu-backend.railway.app` | URL do Railway |
| | `VITE_FRONTEND_FORGE_API_KEY` | `chave_api_123` | Seu provedor de API |
| **Back-end (Railway)** | `DATABASE_URL` | `mysql://user:pass@host/db` | Dashboard do Railway |
| | `JWT_SECRET` | `a1b2c3d4e5f6...` | Gere com crypto |
| | `VITE_APP_ID` | `abc123def456` | Seu provedor OAuth |
| | `OAUTH_SERVER_URL` | `https://oauth.example.com` | Seu provedor OAuth |
| | `VITE_OAUTH_PORTAL_URL` | `https://seu-backend.railway.app` | URL do Railway |
| | `BUILT_IN_FORGE_API_URL` | `https://seu-backend.railway.app` | URL do Railway |
| | `BUILT_IN_FORGE_API_KEY` | `chave_api_123` | Seu provedor de API |

---

## 🔄 Integração Front-end ↔ Back-end

### Atualizar URL do Back-end no Front-end

Após fazer o deploy no Railway, você precisa atualizar a URL do back-end no Vercel:

1. Acesse o dashboard do Vercel
2. Selecione o projeto **"taskflow"**
3. Vá para **"Settings"** → **"Environment Variables"**
4. Atualize as seguintes variáveis com a URL do Railway:
   - `VITE_OAUTH_PORTAL_URL`: `https://seu-backend-production.up.railway.app`
   - `VITE_FRONTEND_FORGE_API_URL`: `https://seu-backend-production.up.railway.app`

5. Clique em **"Save"**
6. Vá para **"Deployments"** e clique em **"Redeploy"** na última deployment
7. Aguarde o redeploy ser concluído

### Testar Integração

1. Acesse a URL do Vercel (front-end)
2. Tente fazer login
3. Tente criar uma tarefa
4. Verifique se os dados estão sendo salvos corretamente

Se tudo funcionar, a integração está completa! ✅

---

## 🐛 Troubleshooting

### Problema: "Failed to fetch" ao criar tarefa

**Causa:** A URL do back-end não está configurada corretamente no front-end.

**Solução:**
1. Verifique se `VITE_FRONTEND_FORGE_API_URL` está configurada corretamente no Vercel
2. Certifique-se de que a URL do Railway está correta (sem barra no final)
3. Faça um redeploy no Vercel

### Problema: Erro 500 no back-end

**Causa:** Variáveis de ambiente não configuradas ou banco de dados não conectado.

**Solução:**
1. Verifique se `DATABASE_URL` está configurada no Railway
2. Verifique se as migrações foram executadas (`pnpm db:push`)
3. Verifique os logs do Railway para mais detalhes

### Problema: Banco de dados vazio após deploy

**Causa:** As migrações não foram executadas durante o build.

**Solução:**
1. No Railway, vá para **"Settings"** do serviço Node.js
2. Certifique-se de que o **Build Command** inclui `pnpm db:push`
3. Faça um redeploy

### Problema: Autenticação não funciona

**Causa:** Variáveis OAuth não configuradas corretamente.

**Solução:**
1. Verifique se `VITE_APP_ID` é igual em ambos os ambientes (Vercel e Railway)
2. Verifique se `OAUTH_SERVER_URL` e `VITE_OAUTH_PORTAL_URL` estão corretos
3. Certifique-se de que o provedor OAuth autoriza as URLs do Vercel e Railway

### Problema: Vercel mostra erro de build

**Causa:** Dependências não instaladas ou erro de TypeScript.

**Solução:**
1. Verifique os logs de build no Vercel
2. Execute `pnpm install` localmente e verifique se há erros
3. Execute `pnpm check` para verificar erros de TypeScript
4. Faça commit das correções e push para GitHub
5. Faça um redeploy no Vercel

### Problema: Railway mostra erro de build

**Causa:** Banco de dados não conectado ou migrações falhando.

**Solução:**
1. Verifique os logs do Railway
2. Certifique-se de que `DATABASE_URL` está configurada
3. Verifique se o banco de dados está rodando
4. Tente executar as migrações manualmente:
   ```bash
   pnpm db:push
   ```

---

## 📊 Checklist de Deploy

Use este checklist para garantir que tudo está configurado corretamente:

### Front-end (Vercel)
- [ ] Repositório GitHub conectado ao Vercel
- [ ] `VITE_APP_ID` configurada
- [ ] `VITE_OAUTH_PORTAL_URL` configurada
- [ ] `VITE_FRONTEND_FORGE_API_URL` configurada
- [ ] `VITE_FRONTEND_FORGE_API_KEY` configurada
- [ ] Build foi bem-sucedido
- [ ] URL do Vercel está acessível

### Back-end (Railway)
- [ ] Repositório GitHub conectado ao Railway
- [ ] Banco de dados MySQL/PostgreSQL criado
- [ ] `DATABASE_URL` configurada
- [ ] `JWT_SECRET` configurada
- [ ] `VITE_APP_ID` configurada
- [ ] `OAUTH_SERVER_URL` configurada
- [ ] `VITE_OAUTH_PORTAL_URL` configurada
- [ ] `BUILT_IN_FORGE_API_URL` configurada
- [ ] `BUILT_IN_FORGE_API_KEY` configurada
- [ ] Build foi bem-sucedido
- [ ] Migrações foram executadas
- [ ] URL do Railway está acessível

### Integração
- [ ] Front-end consegue se comunicar com o back-end
- [ ] Autenticação funciona
- [ ] CRUD de tarefas funciona
- [ ] Dados são persistidos no banco de dados

---

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **Teste a aplicação completamente** - Crie, edite, delete tarefas
2. **Monitore os logs** - Verifique regularmente os logs no Vercel e Railway
3. **Configure alertas** - Configure notificações de erro no Vercel e Railway
4. **Adicione domínio personalizado** - Configure um domínio próprio (opcional)
5. **Configure CI/CD** - Configure GitHub Actions para testes automáticos
6. **Faça backup do banco de dados** - Configure backups automáticos no Railway

---

## 📞 Suporte

Se encontrar problemas durante o deploy:

1. Verifique os logs (Vercel e Railway)
2. Consulte a seção [Troubleshooting](#troubleshooting)
3. Abra uma issue no repositório GitHub
4. Verifique a documentação oficial:
   - Vercel: https://vercel.com/docs
   - Railway: https://docs.railway.app

---

**Parabéns! Seu TaskFlow está em produção! 🎉**
