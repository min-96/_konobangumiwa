# React App Dockerfile
# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]