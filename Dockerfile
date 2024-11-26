# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Set environment variables (optional, can be overridden by docker run or docker-compose)
ENV NODE_ENV=production

# Command to run the app
CMD ["npm", "start"]

