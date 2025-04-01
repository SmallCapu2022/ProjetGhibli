# Use official node image as base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the working directory
COPY . .

# Build the angular app for production (sans modifier le chemin de sortie)
RUN npm run build

# Stage 2: Serve app with nginx
FROM nginx:alpine

# Configurez nginx pour écouter sur le port 8080
RUN sed -i.bak 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Copy built app from builder stage
COPY --from=builder /app/dist/projet-ghibli /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]