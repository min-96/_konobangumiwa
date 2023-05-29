# NestJS App Dockerfile
# First build stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Bundle app source
COPY . .

# Install any needed packages specified in package.json
RUN npm install --force
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# Second stage - Production
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Copy from build stage
COPY --from=builder /usr/src/app .

# Make entrypoint script executable
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Set the entrypoint to execute the script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
