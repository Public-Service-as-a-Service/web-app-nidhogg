# Niðhǫggr 🐲

web-app-nidhogg – Next.js application with extended middleware and authentication control

## Prerequisites

Make sure you have the following installed:

- Node.js v15+ (or NVM to manage versions)
- Yarn v1.22.22
- Docker (for local MySQL development)

# Docker (MySQL Development Database)

To spin up a local MySQL instance using the provided docker-compose.yml, run:

`docker-compose up -d`

This will start a MySQL container in detached mode.

# Next.js (Client App)

From the /client directory, install dependencies:

`yarn install`

To start the development server:

`yarn dev`

# Prisma

Database connection is configured in `.env`:

```
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE"

// example: DATABASE_URL="mysql://root:password@localhost:3306/nidhogg-db"
```

Initialize and prepare the Prisma setup by running the following commands inside /client:

- `npx prisma generate`
- `npx prisma migrate dev --name init`
- `npx prisma db seed`

These commands will:

- Generate the Prisma client
- Apply migrations
- Seed the database with initial data

# Notes

Ensure the Docker MySQL container is running before running Prisma commands.

If you update your Prisma schema, rerun prisma generate.
