# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Final image
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --production

# Environment variables
ENV AWS_REGION=us-east-1
ENV S3_BUCKET=rpa-prod-files

CMD ["node", "dist/app.js"]

