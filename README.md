# Text Message Marketing Campaign Micro-Service

This project implements a serverless text message marketing campaign micro-service on AWS. It uses AWS services like Lambda, API Gateway, SQS, and Step Functions for orchestration.

## Project Structure

```bash
serverless-text-message-service/
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
git clone <repository-url>
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
