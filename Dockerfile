# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application (includes SSR server output)
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built output from the build stage
COPY --from=build /app/dist ./dist

# Set environment defaults
ENV PORT=4000
ENV HOST=localhost
ENV NODE_ENV=production

# Expose the application port
EXPOSE 4000

# Start the server
CMD ["node", "dist/health-app/server/server.mjs"]