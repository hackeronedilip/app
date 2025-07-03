# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory sdssdsd sdsdsds
WORKDIR /usr/src/app

# Copy package.json and package-lock.json dsdsdsdsdds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY . .

# Expose port
EXPOSE 3000

# Run tests first (optional, you can remove if you run tests separately)
RUN npm test

# Start app sdsd sdsd sd sds dsds dsdsd sds
CMD ["npm", "start"]
