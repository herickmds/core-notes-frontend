# Etapa 1: Construir o aplicativo Next.js
FROM node:16.15.0-alpine AS builder

WORKDIR /usr/src/app

# Copiar arquivos de dependências e instalar
COPY package*.json ./
RUN npm install

# Copiar o código-fonte e construir o aplicativo
COPY . .
RUN npm run build

# Etapa 2: Configurar o Nginx para servir o aplicativo
FROM nginx:alpine

# Remover a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copiar os arquivos estáticos do Next.js para o diretório raiz do Nginx
COPY --from=builder /usr/src/app/.next /usr/share/nginx/html/.next
COPY --from=builder /usr/src/app/public /usr/share/nginx/html

# Ajuste as permissões dos arquivos estáticos
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
