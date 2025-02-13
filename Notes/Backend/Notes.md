# MERN Backend Guide

## Introduction
Node.js is an open-source JavaScript runtime environment that allows developers to run JavaScript on the server side. Express.js, built on top of Node.js, is a lightweight web framework that simplifies API development.

This guide provides a structured approach to setting up a MERN backend, covering essential concepts, modules, and best practices, including authentication, middleware, database interaction, and security measures.

---

## 01: Events & Event Emitter
Node.js has a built-in `events` module that allows us to work with event-driven programming. The `EventEmitter` class is used to create and handle custom events.

### Key Concepts:
- **EventEmitter**: A core class in Node.js used for handling events.
- **on()**: Listens for an event.
- **emit()**: Triggers an event.

Example:
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register an event listener
emitter.on('eventName', () => {
    console.log('Event triggered!');
});

// Emit the event
emitter.emit('eventName');
```

---

## 02: File System (FS) Module
The `fs` module allows interaction with the file system, enabling reading, writing, and modifying files.

### Key Features:
- **fs.writeFileSync()**: Writes to a file synchronously.
- **fs.readFileSync()**: Reads from a file synchronously.
- **fs.unlinkSync()**: Deletes a file.

Example:
```javascript
const fs = require('fs');

// Writing to a file
fs.writeFileSync('example.txt', 'Hello, World!');

// Reading from a file
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data);

// Deleting a file
fs.unlinkSync('example.txt');
```

---

## 03: Body Parser Middleware
In Express.js, the body-parser middleware is used to parse incoming request bodies before handling them in route handlers. Since Express 4.16.0, body-parser is built into Express.

### Key Features:
- **express.json()**: Parses JSON request bodies.
- **express.urlencoded()**: Parses URL-encoded form data.

Example:
```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
    console.log(req.body); // Parsed request body
    res.send('Data received');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 04: Folder Structure
Organizing a backend project in a structured way enhances maintainability. Below is a recommended folder structure:

```
mern-backend/
│── src/
│   ├── config/          # Configuration files (DB, env, etc.)
│   ├── controllers/     # Business logic (handling requests & responses)
│   ├── middleware/      # Express middlewares (auth, validation, error handling)
│   ├── models/         # Mongoose models (database schemas)
│   ├── routes/         # API routes
│   ├── services/       # Business logic separate from controllers
│   ├── utils/          # Utility functions (helpers)
│   ├── app.js          # Express app setup
│   ├── server.js       # Entry point
│   ├── swagger.js      # API Documentation (Swagger)
│
│── .env                # Environment variables
│── .gitignore          # Ignored files for Git
│── package.json        # Dependencies and scripts
│── README.md           # Project documentation
```

---

## 05: MongoDB Connection
Connecting to MongoDB using Mongoose:

```javascript
// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database Connection Failed', error);
    }
};
export default connectDB;
```

Now, call this function in `app.js`:
```javascript
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 06: Defining Schemas
Defining a User schema using Mongoose:

```javascript
// src/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User', userSchema);
```

---

## 07: Building Controllers

```javascript
// src/controllers/user.controller.js
import { User } from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already registered' });
        }
        const newUser = new User({ fullName, email, password });
        await newUser.save();
        return res.status(201).json({ success: true, message: 'User created' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
```

---

## 08: Using Bcrypt for Password Hashing

```javascript
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ fullName, email, password: hashedPassword });
```

---

## 09: Creating Routes

```javascript
import express from 'express';
import { register } from '../controllers/user.controller.js';

const router = express.Router();
router.post('/register', register);

export default router;
```

Include the route in `app.js`:
```javascript
import userRouter from './routes/user.routes.js';
app.use('/api/v1/user', userRouter);
```

---

## 10: JWT Authentication

```javascript
import jwt from 'jsonwebtoken';
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
```

Middleware to verify the token:
```javascript
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};
```

This guide provides a comprehensive foundation for setting up a MERN backend with best practices. 🚀



## 13. API Integration with Frontend (React)
Make API calls using `fetch` or `axios` in React to communicate with the backend.

---

## 14. CORS Integration
Enable CORS to allow cross-origin requests:

```js
import cors from "cors";
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
```

---

## Conclusion
This guide provides a structured approach to building a robust MERN backend. It covers key topics like authentication, middleware, and API development.

