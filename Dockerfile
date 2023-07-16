# Create image based on the official Node image from dockerhub
FROM node:lts-buster AS build
 
# Create app directory
WORKDIR /usr/src/app
 
# Get all the code needed to run the app
COPY . .
 
# Install dependencies
RUN npm ci

# Runtime Environment
FROM node:lts-buster AS runtime
WORKDIR /app
COPY src .
COPY package*.json .
COPY --from=build node_modules .
 
# Expose the port the app runs in
EXPOSE 443
 
# Serve the app
CMD ["npm", "start"]