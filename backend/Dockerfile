# NestJS App Dockerfile
# Use an official Node runtime as the parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /usr/src/app

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Bundle app source
COPY . .

# Install any needed packages specified in package.json
RUN npm install --force
RUN npx prisma generate
RUN npm install -g nodemon

# Make entrypoint script executable
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Set the entrypoint to execute the script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
