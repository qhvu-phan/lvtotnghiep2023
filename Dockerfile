FROM node:18.15.0

#tạo thư mục làm việc trong container
WORKDIR /usr/src/app

#sao chép mã nguồn ứng dụng vào thư mục làm việc
COPY . .

#cài đặt dependencies
RUN npm ci

#mở cổng server
EXPOSE 5000

#khởi chạy ứng dụng
# FROM nginx:latest
# COPY --from=build /app /usr/share/nginx/html
# RUN apt-get update && apt-get install -y npm
CMD ["npm", "start"]