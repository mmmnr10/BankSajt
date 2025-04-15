# Använd Node.js som basbild
FROM node:16-alpine

# Ställ in arbetskatalogen
WORKDIR /app

# Kopiera package.json och package-lock.json (eller yarn.lock) till arbetskatalogen
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera resten av applikationen
COPY . .

# Bygg applikationen
RUN npm run build

# Exponera porten för Next.js (standard är 3000)
EXPOSE 3000

# Starta applikationen
CMD ["npm", "start"]
