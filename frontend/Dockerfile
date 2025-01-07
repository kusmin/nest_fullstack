# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Gerar o build de produção
RUN npm run build -- --configuration production

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remover a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos construídos para o diretório padrão do Nginx
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Expor a porta que o Nginx irá utilizar
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
