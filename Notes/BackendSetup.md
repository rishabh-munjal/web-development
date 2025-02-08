# Express Backend Setup with MongoDB, Cloudinary & Multer

## Introduction
This guide will help you set up an Express.js backend with MongoDB as the database, Cloudinary for image storage, and Multer for handling file uploads. The project follows a modular folder structure for scalability and maintainability.

---

## Prerequisites
Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Cloudinary Account](https://cloudinary.com/)
- [Postman](https://www.postman.com/) for API testing

---

## Folder Structure
```
backend/
│── config/
│   ├── db.js             # MongoDB connection setup
│   ├── cloudinary.js     # Cloudinary configuration
│
│── models/
│   ├── User.js           # User schema & model
│
│── routes/
│   ├── userRoutes.js     # User-related routes
│
│── controllers/
│   ├── userController.js # User-related logic
│
│── middlewares/
│   ├── authMiddleware.js # Authentication middleware
│   ├── upload.js         # Multer setup for file uploads
│
│── utils/
│   ├── generateToken.js  # JWT token generator
│
│── .env                  # Environment variables
│── server.js             # Main entry point
│── package.json          # Dependencies & scripts
│── README.md             # Documentation
│── uploads/              # Temporary storage for file uploads
```

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-repo-name.git
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Database Connection (MongoDB)
Inside `config/db.js`:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

---

## User Model
Inside `models/User.js`:
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
```

---

## Cloudinary Setup
Inside `config/cloudinary.js`:
```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
```

---

## Multer Setup for File Uploads
Inside `middlewares/upload.js`:
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

module.exports = upload;
```

---

## Routes
Inside `routes/userRoutes.js`:
```javascript
const express = require('express');
const { registerUser } = require('../controllers/userController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);

module.exports = router;
```

---

## User Controller
Inside `controllers/userController.js`:
```javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let avatarUrl = '';
        if (req.file) {
            const uploadedResponse = await cloudinary.uploader.upload(req.file.path);
            avatarUrl = uploadedResponse.secure_url;
        }

        const user = new User({ name, email, password: hashedPassword, avatar: avatarUrl });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser };
```

---

## Running the Project
```bash
# Start the server
npm start
```

---

## API Endpoints
| Method | Endpoint         | Description         |
|--------|-----------------|---------------------|
| POST   | /api/users/register | Register a new user |

---

## Conclusion
You now have a fully functional Express.js backend with MongoDB, user authentication, Cloudinary for image uploads, and Multer for handling file uploads. You can extend this setup by adding authentication, middleware, and additional features as needed.

### Additional Features to Consider
- Implement user authentication with JWT middleware
- Add user login and profile update routes
- Set up a frontend to interact with the backend
- Deploy using platforms like Heroku or Render

