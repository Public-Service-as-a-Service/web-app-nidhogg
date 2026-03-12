ARG NODE_VERSION=22-slim

ARG API_PROXY_TARGET=http://host.docker.internal:8087

FROM node:${NODE_VERSION} AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ============================================
# Stage 1: Install dependencies
# ============================================
FROM base AS dependencies

# Prisma schema is copied before install so @prisma/client postinstall can generate correctly.
COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    corepack enable && yarn install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application
# ============================================
FROM base AS builder
ENV NODE_ENV=production

ARG API_PROXY_TARGET
ENV API_PROXY_TARGET=${API_PROXY_TARGET}

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN corepack enable && yarn prisma generate && yarn build

# ============================================
# Stage 3: Run Next.js application
# ============================================
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/messages ./messages
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]