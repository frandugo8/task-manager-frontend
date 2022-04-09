## STAGE 1: Build ##

# We label our stage as ‘builder’
FROM node:13-alpine as builder

COPY package.json package-lock.json ./

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /rt-app && mv ./node_modules ./rt-app

WORKDIR /rt-app

COPY . .

# Build the react app in production mode and store the artifacts in dist folder

RUN npm run build

## STAGE 2: Setup ##

FROM nginx:1.14.1-alpine

# Copy our default nginx config
COPY src/nginx/default.conf /etc/nginx/conf.d/

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /rt-app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]