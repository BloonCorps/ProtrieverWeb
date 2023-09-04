# Use Node.js image
FROM node:14

# Set the working directory inside the Docker container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]

# docker run -p 80:3000 protriever_react

