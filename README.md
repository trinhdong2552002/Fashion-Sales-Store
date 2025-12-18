# 🛍️ Fashion Sales Store

[![Live Demo](https://fashion-sales-store.site.name.vn)
[![Backend API](https://springadamstore-production.up.railway.app/adamstore/swagger-ui/index.html)

## 📸 Screenshots



## 🚀 Tech Stack

**Frontend:**
* ![React](https://img.shields.io/badge/React-19-blue) **ReactJS (Vite)**
* ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) **Redux Toolkit & RTK Query**
* ![MUI](https://img.shields.io/badge/MUI-Material_UI-blue) **Material UI**
* **Authentication:** JWT, React Router DOM (Protected Routes)

---

## 🛠️ Installation & Setup (Local Development)

### 1. Frontend Setup (Client)

Prerequisites: Node.js (v18+) and npm.

```bash
# 1. Clone the repository
git clone [https://github.com/trinhdong2552002/Fashion-Sales-Store.git](https://github.com/trinhdong2552002/Fashion-Sales-Store.git)
cd Fashion-Sales-Store

# 2. Install dependencies
npm install

# 3. Create .env file (if needed) and run development server
npm run dev

```
Open http://localhost:5173 to view it in the browser.

To build for production:
   npm run build

### 2. Backend Setup (Docker)
You can run the full backend stack (Spring Boot + MySQL + Redis) instantly using Docker.
```bash
# 1. Clone the Backend repository
git clone https://github.com/trinhdong2552002/Spring_AdamStore.git
cd Spring_AdamStore

# 2. Stop any running containers (optional)
docker-compose down

# 3. Start the application
docker-compose up -d
```
Note: The backend service requires environment variables (.env). Please contact the author if you need the env file for local development, or use the Docker image provided.

## 📖 API Documentation & Testing
Once the backend is running (locally or live), you can explore the API endpoints via Swagger UI:

``` bash
Live Swagger: https://springadamstore-production.up.railway.app/adamstore/swagger-ui/index.html

Local Swagger: http://localhost:8080/adamstore/swagger-ui/index.html

JSON Docs: http://localhost:8080/adamstore/v3/api-docs/backend-service
```

## 💳 Test Payment Credentials (VNPAY)
Use these credentials to test the payment flow in Sandbox mode:

Field	            Value
Bank	          | NCB
Card Number	    | 9704198526191432198
Cardholder Name | NGUYEN VAN A
Issue Date	    | 07/15
OTP	          | 123456
