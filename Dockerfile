FROM node:14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install express

# Copy source code
COPY . .

# Set environment variables
ENV PORT=3000
ENV MAX_RUNTIME=60000

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
