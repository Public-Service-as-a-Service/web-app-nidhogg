ARG NODE_VERSION=22-slim

ARG API_PROXY_TARGET_NOTIFIER=http://api-service-notifier:8080
ARG API_PROXY_TARGET_USERS=http://api-service-webappusers:8080
ARG API_PROXY_TARGET_TEAMSSENDER=http://api-service-teams-sender:8080

FROM node:${NODE_VERSION} AS base

ARG API_PROXY_TARGET_NOTIFIER
ARG API_PROXY_TARGET_USERS
ARG API_PROXY_TARGET_TEAMSSENDER

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

ENV API_PROXY_TARGET_NOTIFIER=${API_PROXY_TARGET_NOTIFIER} \
    API_PROXY_TARGET_USERS=${API_PROXY_TARGET_USERS} \
    API_PROXY_TARGET_TEAMSSENDER=${API_PROXY_TARGET_TEAMSSENDER}

# ============================================
# Stage 1: Install dependencies
# ============================================
FROM base AS dependencies

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    corepack enable && yarn install --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application
# ============================================
FROM base AS builder
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,target=/app/.next/cache \
    corepack enable && yarn prisma generate && yarn build

# ============================================
# Stage 3: Run Next.js application
# ============================================
FROM base AS runner

ARG NEXT_PUBLIC_API_URL=/api

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ENV API_PROXY_TARGET_NOTIFIER=${API_PROXY_TARGET_NOTIFIER}
ENV API_PROXY_TARGET_USERS=${API_PROXY_TARGET_USERS}
ENV API_PROXY_TARGET_TEAMSSENDER=${API_PROXY_TARGET_TEAMSSENDER}

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/messages ./messages
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

CMD ["node", "server.js"]