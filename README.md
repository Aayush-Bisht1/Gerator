# Device Marketplace

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Aayush-Bisht1/Gerator.git
cd Gerator
```

### 2️⃣ Install Dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file inside the **backend** folder with the following:
```env
DB_HOST=localhost
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Application
Start the backend and frontend servers:

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm start
```

---

## 🧩 API Endpoints

### 📦 Device Routes (`/api/devices`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/` | Get all devices with pagination and filters (supports `page`, `limit`, `search`, `minPrice`, `maxPrice`, `transactionType`, `sellerRole`, `warranty`, `shipping`, `deviceStatus`, `location`, `sortBy`) |
| `GET` | `/:id` | Get details of a specific device by ID |

---

### 👤 User Routes (`/api/users`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/register` | Register a new user with `email` and `password` |
| `POST` | `/login` | Authenticate user and return a JWT token |

---

### ✅ Example
```
GET /api/devices?search=iphone&minPrice=500&maxPrice=2000&page=1&limit=10
```

---

Your backend will run at **http://localhost:3000**  
Your frontend will run at **http://localhost:5173**