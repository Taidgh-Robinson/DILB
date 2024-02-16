FROM node:14-alpine as build

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the React app
RUN npm run build

# Production environment
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
# Copy build output to serve
COPY --from=build /app/build /usr/share/nginx/html

COPY bootstrap.min.css /usr/share/nginx/html/static/css

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
