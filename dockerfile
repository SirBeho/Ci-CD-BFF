# Etapa base
FROM node:16-alpine AS base

# Etapa de dependencias
FROM base AS dependencies

WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json* ./

# Instalación de todas las dependencias (incluidas las de desarrollo)
RUN npm install

# Etapa de construcción
FROM dependencies AS build

WORKDIR /app

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilación del código de Nest.js
RUN npm run build

# Etapa final
FROM node:14-alpine

WORKDIR /app

# Copiar los archivos compilados y las dependencias del proyecto
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Configurar variables de entorno y puerto
ENV NODE_ENV=production
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
