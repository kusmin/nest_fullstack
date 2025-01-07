#!/bin/bash

# Espera o PostgreSQL iniciar
./wait-for-it.sh db:5432 -t 60

# Executa as migrations
npx prisma migrate deploy

# Inicia a aplicação
node dist/main.js