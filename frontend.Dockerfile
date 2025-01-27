FROM oven/bun:1

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY turbo.json .

COPY apps/web/package.json ./apps/web/

RUN bun install --frozen-lockfile

COPY . .

WORKDIR /app/apps/web

RUN bun run build

CMD ["bun", "start"]

