FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev
COPY backend/src ./src
COPY backend/sql ./sql
COPY data/products.json /data/products.json
USER node
EXPOSE 4000
CMD ["npm", "start"]
