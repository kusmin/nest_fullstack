# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Adicionar bash para o wait-for-it.sh
RUN apk add --no-cache bash

COPY package.json package-lock.json ./
COPY prisma/ ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine

WORKDIR /app

# Adicionar bash para o wait-for-it.sh
RUN apk add --no-cache bash

# Copiar arquivos necessários
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/wait-for-it.sh ./wait-for-it.sh
COPY --from=builder /app/start.sh ./start.sh

# Torne os scripts executáveis
RUN chmod +x ./wait-for-it.sh ./start.sh

# Instalar dependências de produção
RUN npm install --production

# Definir variável de ambiente
ENV NODE_ENV=production

# Expor a porta
EXPOSE 3000

# Definir o script de inicialização
CMD ["./start.sh"]