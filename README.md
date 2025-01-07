# Task Manager - Sistema de Gerenciamento de Tarefas

## 🚀 Sobre o Projeto
O **Task Manager** é uma aplicação fullstack que permite aos usuários gerenciar suas tarefas de forma eficiente. O sistema inclui recursos para listar, adicionar, editar, excluir e marcar tarefas como concluídas, com autenticação segura via JWT.

## 🛠 Tecnologias Utilizadas

### Backend
- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)
- **Validação:** class-validator
- **Documentação:** Swagger

### Frontend
- **Framework:** Angular
- **UI:** Angular Material
- **Comunicação HTTP:** HttpClient
- **Roteamento:** Angular Router
- **Feedback Visual:** MatSnackBar

## 📦 Estrutura do Projeto
```
task-manager/
├── backend/         # Código fonte do backend em NestJS
├── frontend/        # Código fonte do frontend em Angular
└── docker/          # Arquivos de configuração Docker
```

## 🚦 Pré-requisitos
- Docker e Docker Compose instalados
- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL 

## 🔧 Configuração e Instalação

### Usando Docker (Recomendado)
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager
```

2. Inicie os containers com Docker Compose:
```bash
docker-compose up -d
```

A aplicação estará disponível em:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api

### Instalação Manual

#### Backend
1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrations:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run start
```

#### Frontend
1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
ng run start
```

## 🔐 Funcionalidades

### Autenticação
- Registro de usuário
- Login com JWT
- Proteção de rotas autenticadas

### Gerenciamento de Tarefas
- Listagem de tarefas com paginação
- Criação de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Marcação de tarefas como concluídas
- Filtro por status (pendente/concluída)

## 🌐 Endpoints da API

### Autenticação
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login de usuário

### Tarefas
- `GET /tasks` - Lista todas as tarefas
- `POST /tasks` - Cria uma nova tarefa
- `PUT /tasks/:id` - Atualiza uma tarefa
- `DELETE /tasks/:id` - Remove uma tarefa
- `PATCH /tasks/:id/complete` - Marca/desmarca tarefa como concluída

## 🌍 Ambiente de Produção

- Frontend: [URL do deploy no Vercel/Netlify]
- Backend: [URL do deploy no Render/Railway]
- Documentação API (Swagger): [URL do Swagger]

## ⚙️ Variáveis de Ambiente

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
JWT_SECRET="seu-segredo-jwt"
PORT=3000
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## 🤝 Contribuindo
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 👨‍💻 Autor
Seu Nome - [@skusmin](https://github.com/kusmin)