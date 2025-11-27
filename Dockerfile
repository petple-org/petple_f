FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

#  정적 파일을 서비스할 'serve' 패키지 전역 설치
RUN npm install -g serve

COPY . .

RUN npm run build

# 컨테이너 내부에서 3000번 포트를 쓴다고 선언
EXPOSE 3000

# -s: SPA 설정 (새로고침 시 404 방지)
# -l 3000: 3000번 포트로 실행
CMD ["serve", "-s", "dist", "-l", "3000"]