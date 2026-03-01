FROM node:20-alpine

EXPOSE 3000

WORKDIR /usr/src/app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# https://www.gyanblog.com/javascript/nextjs-how-build-docker-with-api-url/
# ARG
ARG SPACE_ID
ARG ACCESS_TOKEN
ARG PREVIEW_ACCESS_TOKEN

ARG EMAILUSER
ARG EMAILPASS
ARG TO
ARG GA

# ENV
ENV SPACE_ID=$SPACE_ID
ENV ACCESS_TOKEN=$ACCESS_TOKEN
ENV PREVIEW_ACCESS_TOKEN=$PREVIEW_ACCESS_TOKEN

ENV EMAILUSER=$EMAILUSER
ENV EMAILPASS=$EMAILPASS
ENV TO=$TO
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS=$GA

# Copy lockfile and manifests first for better layer caching
COPY pnpm-lock.yaml package.json ./

RUN pnpm fetch

# Copy the rest of the source
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm add sharp
RUN pnpm build

# And finally the command to run the application
CMD ["pnpm", "start"]
