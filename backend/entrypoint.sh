#!/bin/sh

# Wait for PostgreSQL to be ready
until pg_isready --timeout=0 --dbname=$POSTGRES_DB --host=$POSTGRES_HOST --port=$POSTGRES_PORT --username=$POSTGRES_USER; do
  sleep 1
done

# Run Prisma migrations
npx prisma migrate dev
npx prisma db push --preview-feature

# Start the NestJS app
#npm run start:dev
npx nodemon --legacy-watch --watch /usr/src/app/src/ --verbose --ext ts --exec "npm run start:dev"