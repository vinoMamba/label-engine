FROM node:18 as development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g
RUN pnpm i
COPY . .
RUN pnpm build 

FROM node:18 as production

WORKDIR /usr/src/app
COPY package.json ./

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g
RUN pnpm i

EXPOSE 3000

COPY --from=development /usr/src/app/.next ./.next
CMD ["pnpm", "start"]
