# 1. Use an official lightweight Node image
FROM node:20-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your files
COPY . .

# 5. Inform Docker that the container listens on port 3000
EXPOSE 3000

# 6. Run the app
CMD ["node", "index.js"]