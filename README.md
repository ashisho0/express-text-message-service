# Text Message Marketing Campaign Micro-Service

This project implements a traditional text message marketing campaign micro-service built on express. It uses RabbitMQ to queue the messages.

## Project Structure

```bash
express-text-message-service/
│
├── controllers/
├── helpers/
├── node_modules/
├── routes/
├── services/
├── tests/
├── app.js
├── Dockerfile/
├── package.json
└── server.js
```

## Setup and Deployment Instructions

### Step 1: Clone repo and setup

```bash
git clone https://github.com/ashisho0/express-text-message-service.git
cd express-text-message-service
npm i
```

### Step 2: Setup Via Docker
1. **Docker Desktop**: Ensure you have docker.
   
2. **Run**: 
```bash
docker build -t express-app .
docker run -p 3000:3000 express-app
```

# OR
### Step 2: Setup locally
1. **Node**: Ensure you have node.
   
2. **Run in dev mode**: 
```bash
npm i
npm run dev
```

### Step 3: Run tests
2. **Test in dev mode**: 
```bash
npm run test
```
