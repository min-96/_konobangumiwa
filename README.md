# KONOBANGUMIWA 

![image](https://github.com/min-96/_konobangumiwa/assets/67457956/f7d520b6-c054-40cc-a9e5-63d01c614c24)


## 🏷️  KONOBANGUMIWA 소개 

* 이제는 당당한 오타쿠가 되기 위한 애니메이션 평가 사이트
* MZ세대들의 취미는 애니보기! 본 애니메이션을 기록하고 보고싶은 애니를 찜꽁하자 
* 퍼스널 애니메이션 이제는 개인의 취향에 맞게 골라보자! 평가한 애니메이션 기반으로 취향분석에 맞는 애니메이션 추천 
<br>
<br>

## 👥  KONOBANGUMIWA 개발자

🖥️  **FRONTEND Developer DongKim**  
   [https://github.com/parktest0325]
   

💾  **BACKEND Developer Minyong**   
    [https://github.com/min-96]


<br>
<br>

## 🔨 KONOBANGUMIWA 설치 및 실행방법
#### 구글 OAUTH 클라이언트 ID 생성
1. https://console.cloud.google.com/apis/credentials 링크에서 프로젝트 생성
2. 사용자 인증정보 생성
3. 승인된 자바스크립트 원본: http://localhost
4. 승인된 리디렉션 URI: http://localhost/api/auth/google/callback

#### 환경변수 파일 세팅
1. backend/.env
```
REDIS_URL = 'redis://redis:6379'

DATABASE_URL = 'postgresql://min96:1q2w3e4r!@postgres:5432/konobangumiwa'

POSTGRES_HOST = 'postgres'
POSTGRES_USER = 'min96'
POSTGRES_DB = 'konobangumiwa'
POSTGRES_PASSWORD = '1q2w3e4r!'
POSTGRES_PORT = 5432

ELASTICSEARCH_NODE = 'http://elasticsearch:9200'

GOOGLE_CLIENT_ID = 위에서 생성한 구글 OAuth CLIENT ID
GOOGLE_CLIENT_SECRET = 구글 OAuth 클라이언트 보안 비밀번호

SESSION_SECRET = 'hard_session_secret_key'
GOOGLE_CALLBACK_URL = 'http://localhost/api/auth/google/callback'
```

2. frontend/.env.local
```
REACT_APP_API_URL='http://localhost/'
```


#### for MAC
```
git clone https://github.com/min-96/_konobangumiwa.git
cd _konobangumiwa
chmod 777 backend/entrypoint.sh
docker-compose up
```

#### for Windows
* backend/entrypoint.sh 파일의 End Of Line을 CRLF => LF로 변경
* 이후 프로젝트 루트 디렉토리에서 `docker-compose up` 
 

#### 실행 및 환경
`http://localhost` 주소로 접속
* **nginx**: localhost:80
* **nestjs**: localhost:3000
* **react**: localhost:3001
* **postgres**: localhost:5432



<br>
<br>

## 📚 KONOBANGUMIWA 기술

<div align=center> 
  
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
  
  <br>
  
  
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black">
  <br>
  
  
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=black"> 
  <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=black">
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=black">
  <img src="https://img.shields.io/badge/graphql-E10098?style=for-the-badge&logo=graphql&logoColor=black">
  <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=black">
  <br>
  
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=black">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=black">
  <img src="https://img.shields.io/badge/elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=black"> 
</div>
