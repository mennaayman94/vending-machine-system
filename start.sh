#!/bin/sh
# Run Prisma generate and migrate commands
npx prisma generate --schema=./src/prisma/schema.prisma
npx prisma migrate dev --schema=./src/prisma/schema.prisma

# Run the database initialization script
node ./scripts/init-db.js

# Run the main application
npm run start:dev