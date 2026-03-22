FROM node:20-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends tmux python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

RUN mkdir -p /var/log/terminal-sessions

EXPOSE 7681

CMD ["node", "server.js"]
