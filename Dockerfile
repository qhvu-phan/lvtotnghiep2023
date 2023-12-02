FROM node:18.15.0 as build

#tạo thư mục làm việc trong container
WORKDIR /usr/src/app

#sao chép packge.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

#cài đặt dependencies
RUN npm ci

#sao chép mã nguồn ứng dụng vào thư mục làm việc
COPY . .

#mở cổng server
EXPOSE 5000

#khởi chạy ứng dụng
# FROM nginx:latest
# COPY --from=build /app /usr/share/nginx/html
# RUN apt-get update && apt-get install -y npm
CMD ["npm", "start"]