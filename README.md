# 🚀 Chainflow

Chainflow is a production-style Web3 backend built with NestJS, Prisma, and Ethers.js.

It implements:

🔐 User Authentication (JWT)

👛 Wallet Management

⛽ Transaction Preparation (Gas Estimation)

📡 Non-Custodial Signed Transaction Relay

📊 Transaction Lifecycle Tracking

📘 Swagger API Documentation

This project demonstrates real-world backend architecture for Web3 applications.

## 🏗 Architecture Overview

Chainflow follows a secure non-custodial pattern:

User registers & logs in (JWT issued)

User adds wallet address

Backend prepares transaction

Frontend signs transaction

Backend validates and broadcasts

Backend waits for receipt & stores result

Private keys never touch the backend.

## 🛠 Tech Stack

| Layer       | Technology          |
|------------|--------------------|
| Framework  | NestJS             |
| Language   | TypeScript         |
| Blockchain | ethers.js v6       |
| Database   | Prisma ORM         |
| Auth       | JWT (Passport)     |
| Docs       | Swagger            |
| Network    | Ethereum / Sepolia |


## 🔐 Authentication
Chainflow uses JWT-based authentication.

## API Endpoints
Register
POST /auth/register

Body:
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

Login
POST /auth/login


Returns:
```json
{
  "access_token": "jwt_token_here"
}
```

Use JWT in headers:

Authorization: Bearer <token>

👛 Wallet Management

Generate Nonce
GET /wallet/nonce
Returns:
```json
{
  "message": "Sign this message to verify your wallet ownership.Nonce: 5e27809bc546799e53681ab84fcc6ab1"
}
```

Verify Wallet
GET /wallet/verify
Body:
```json
{
  "address": "0x...",
  "signature": "0x..."
}
```

Response:
```json
{
  "message": "Wallet verified successfully"
}
```

Get Wallet
GET /wallet
Returns:
```json
{
  "address": "0x..."
}
```

Get Balance
GET /wallet/balance
Returns:
```json
{
  "balance": "1000000000000000000"
}
```

Associates wallet with authenticated user.

⛽ Transaction Flow
1️⃣ Prepare Transaction
POST /transfer/estimate

Body:
```json
{
  "from": "0x...",
  "to": "0x...",
  "amount": "100000000000000000"
}
```

Response:
```json
{
    "gas": "21000",
    "amount": "100000000000000000",
    "total" : "100000000000021000"
}
```

User signs using these parameters on frontend.

2️⃣ Execute Signed Transaction
POST /transfer/transfer

Body:
```json
{
  "signature": "0x..."
}
```

Backend:

Decodes raw tx

Validates signer

Broadcasts via RPC

Waits for receipt

Stores transaction in DB

Response:
```json
{
  "txHash": "...",
  "gas": "...",
  "fee": "...",
  "blockNumber": "...",
  "status": "success"
}
```

## 📘 Swagger Documentation

Swagger UI available at:

http://localhost:3000/api


All endpoints are documented using @nestjs/swagger.

## 🗃 Database Models
### User:
id
email
password (hashed)

### Wallet:
id
userId
address
createdAt

### Nonce:
id
userId
nonce
expiresAt
createdAt

### Transfer:
id
userId
from
to
amount
createdAt

## 🚀 Getting Started
1️⃣ Clone
```bash
git clone https://github.com/darrendc26/chainflow.git
cd chainflow
```

2️⃣ Install
```bash
npm install
```

3️⃣ Setup Environment
Create .env:

DATABASE_URL="file:./dev.db"
JWT_ACCESS_TOKEN_SECRET="your_access_token_secret"
JWT_REFRESH_TOKEN_SECRET="your_refresh_token_secret"
SEPOLIA_RPC_URL="your_rpc_url"
PRIVATE_KEY="optional_for_testing"

4️⃣ Run Prisma
```bash
npx prisma migrate dev
npx prisma generate
```

```bash
5️⃣ Start Server
npm run start:dev
```

Swagger available at:
http://localhost:3000/api


## 🔒 Security Features

JWT authentication guard
Wallet ownership validation via signature recovery
Nonce verification
ChainId enforcement
EIP-1559 fee support
BigInt-safe handling of blockchain values