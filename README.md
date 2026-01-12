# 🛍️ Fashion Sales Store

### 🔗 Live Demo & API
* **Live App:** [https://fashion-sales-store.site.name.vn](https://fashion-sales-store.site.name.vn)
* **Backend API:** [Swagger UI Link](https://springadamstore-production.up.railway.app/adamstore/swagger-ui/index.html)

## 📸 Screenshots

* Home Page
  

<img width="1920" height="963" alt="image" src="https://github.com/user-attachments/assets/28df675b-1554-4609-8667-3cff64346471" />

* Blog Page
  

<img width="1920" height="964" alt="image" src="https://github.com/user-attachments/assets/2232dc2e-a03f-4a13-8663-852d5b066ce9" />

* Help Page
  

<img width="1920" height="961" alt="Screenshot 2025-12-18 at 16 34 39" src="https://github.com/user-attachments/assets/991a0cea-9b42-45e7-a229-b6047e6f6f11" />

* About Page
  

<img width="1920" height="964" alt="Screenshot 2025-12-18 at 16 35 21" src="https://github.com/user-attachments/assets/34586839-e1b7-4f46-b3e2-b10c166e0705" />

* Account Information Page
  

<img width="1920" height="964" alt="image" src="https://github.com/user-attachments/assets/f0919fb5-ffff-471f-b367-cffb74990d61" />

* Product Page
  

<img width="1920" height="961" alt="image" src="https://github.com/user-attachments/assets/b964beca-74d5-4fcb-9fb5-60378da80e1f" />


## 🚀 Tech Stack

**Frontend:**
* ![React](https://img.shields.io/badge/React-19-blue) **ReactJS (Vite)**
* ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) **Redux Toolkit & RTK Query**
* ![MUI](https://img.shields.io/badge/MUI-Material_UI-blue) **Material UI**
* **Authentication:** JWT, React Router DOM

---

## 🛠️ Installation & Setup (Local Development)

### 1. Frontend Setup (Client)

Prerequisites: Node.js (v18+) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/trinhdong2552002/Fashion-Sales-Store.git
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
Local Swagger: http://localhost:8080/adamstore/swagger-ui/index.html

JSON Docs: http://localhost:8080/adamstore/v3/api-docs/backend-service
```


## 📅 Project Roadmap & Management

I used ![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white) to manage the development process.

* **View my Development Plan:** [Click here to view Notion Board](https://www.notion.so/2657cf962e9c80a9bcdbe4599c4a05ca?v=2657cf962e9c8109a5f8000c4ae3ebea)

  

## 💳 Test Payment Credentials (VNPAY)
Use these credentials to test the payment flow in Sandbox mode:

| Bank                  | NCB                      |
|-----------------------|--------------------------|
| Card Number           | 9704198526191432198      |
| Cardholder Name       | NGUYEN VAN A             |
| Issue Date            | 07/15                    |
| OTP Password          | 123456                   |
