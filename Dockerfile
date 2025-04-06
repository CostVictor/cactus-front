FROM node:20-alpine

WORKDIR /app

# Instala as dependências
COPY package.json package-lock.json ./
RUN npm ci

# Copia os arquivos
COPY . .

# Expõe a porta
EXPOSE 3000

# Inicia o app
CMD ["npm", "run", "dev"]
