# Use the official Node.js image to build and run the application
FROM node:20-alpine

# Set the working directory
WORKDIR /orionTek-front/app

# Copy package.json and package-lock.json to the container
COPY package*.json /orionTek-front/app

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /orionTek-front/app

# Build the application
RUN npm run build

# Expose port 5173, which is Vite's default port
EXPOSE 4173

# Serve the application using Vite
CMD ["npm", "run", "preview"]
