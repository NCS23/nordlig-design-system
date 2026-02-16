FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy all package.json files for pnpm workspace install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/tokens/package.json ./packages/tokens/
COPY packages/styles/package.json ./packages/styles/
COPY packages/components/package.json ./packages/components/
COPY apps/storybook/package.json ./apps/storybook/
COPY apps/docs/package.json ./apps/docs/
COPY packages/mcp-agents/cli/package.json ./packages/mcp-agents/cli/
COPY packages/mcp-agents/design-system/package.json ./packages/mcp-agents/design-system/
COPY packages/mcp-agents/documentation/package.json ./packages/mcp-agents/documentation/
COPY packages/mcp-agents/testing/package.json ./packages/mcp-agents/testing/
COPY packages/mcp-agents/training-analyzer/package.json ./packages/mcp-agents/training-analyzer/
COPY packages/mcp-agents/ux-review/package.json ./packages/mcp-agents/ux-review/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build:tokens

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 6006

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "storybook"]
