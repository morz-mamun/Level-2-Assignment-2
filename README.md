# Assignment 2

## Description
This is a Node.js backend application built with TypeScript, Express, and MongoDB (via Mongoose). It uses environment variables for configuration, includes linting and formatting scripts, and supports development and production start scripts.

---

## Prerequisites

- Node.js (v16 or later recommended)
- pnpm (https://pnpm.io/)
- MongoDB Atlas or local MongoDB instance

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd assignment-2
```
2. **Install dependencies**
  ```bash
pnpm install
```

3. **Configure environment variables**
   Create a .env file in the root directory and add the following variables:
```bash
 NODE_ENV=development
 PORT=5000
DATABASE_URL="YOUR_MONGODB_URL"
BCRYPT_SALT_ROUNDS="Your_SALT_ROUND"
```


 
