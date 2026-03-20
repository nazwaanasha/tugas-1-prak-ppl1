# Gunakan base image Node.js versi LTS (ringan dengan Alpine Linux)
FROM node:18-alpine

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json terlebih dahulu (optimasi Docker layer cache)
COPY package*.json ./

# Install dependensi production saja
RUN npm install --only=production

# Salin seluruh source code ke dalam container
COPY . .

# Ekspos port 3000 (informasi dokumentasi, tidak memforward port)
EXPOSE 3000

# Perintah yang dijalankan saat container dimulai
CMD ["node", "src/server.js"]