# Use Node.js LTS (14.x) as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (assuming your Express app runs on port 3000)
EXPOSE 3000

# Start the application using npm start script
CMD ["npm", "start"]
