#!/bin/sh

# Wait for Elasticsearch to be ready
until curl -sS --fail http://elasticsearch:9200 -o /dev/null; do
  echo "Waiting for Elasticsearch to be ready..."
  sleep 1
done

# Wait for PostgreSQL to be ready
until pg_isready --timeout=0 --dbname=$POSTGRES_DB --host=$POSTGRES_HOST --port=$POSTGRES_PORT --username=$POSTGRES_USER; do
  sleep 1
done

# Run Prisma migrations
npx prisma migrate deploy

# Start the NestJS app
npm start
