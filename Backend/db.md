Here’s a comprehensive list of **MongoDB & Mongoose** commands you'll need for a **full-stack CRUD app with authentication**:

---

## **1️⃣ MongoDB Setup & Basic Commands**
### **Start MongoDB**
```sh
mongod  # Start MongoDB server
mongo   # Open MongoDB shell
```

### **Database Operations**
```js
show dbs;                  // Show all databases
use database_name;         // Switch to a database (creates if not exists)
db.dropDatabase();         // Delete current database
```

### **Collections (Tables)**
```js
db.createCollection("users");   // Create a collection
show collections;               // List collections
db.users.drop();                // Delete a collection
```

### **CRUD Operations**
#### **Create (Insert)**
```js
db.users.insertOne({ name: "John", email: "john@example.com" });
db.users.insertMany([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" }
]);
```

#### **Read (Find)**
```js
db.users.find();               // Get all users
db.users.find().pretty();      // Pretty print results
db.users.find({ name: "Alice" });  // Find specific user
db.users.findOne({ email: "john@example.com" }); // Find first match
```

#### **Update**
```js
db.users.updateOne(
  { name: "Alice" },
  { $set: { email: "newalice@example.com" } }
);

db.users.updateMany(
  { verified: false },
  { $set: { verified: true } }
);
```

#### **Delete**
```js
db.users.deleteOne({ name: "Alice" });
db.users.deleteMany({ verified: false });
```

---

## **2️⃣ Mongoose (Node.js)**
### **Install Mongoose**
```sh
npm install mongoose
```

### **Connect to MongoDB**
```js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
```

---

### **Define a Mongoose Schema & Model**
```js
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

---

### **CRUD Operations with Mongoose**
#### **Create a User**
```js
const newUser = new User({ name: "John", email: "john@example.com", password: "hashedpassword" });
await newUser.save();
```

#### **Read Users**
```js
const users = await User.find();  // Get all users
const user = await User.findOne({ email: "john@example.com" }); // Find one
const userById = await User.findById("user_id_here"); // Find by ID
```

#### **Update User**
```js
await User.updateOne({ email: "john@example.com" }, { name: "John Doe" });
await User.findByIdAndUpdate("user_id_here", { password: "newhashedpassword" }, { new: true });
```

#### **Delete User**
```js
await User.deleteOne({ email: "john@example.com" });
await User.findByIdAndDelete("user_id_here");
```

---

## **3️⃣ Authentication (JWT & Password Hashing)**
### **Install Dependencies**
```sh
npm install bcryptjs jsonwebtoken
```

### **Hash Passwords**
```js
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash("mysecretpassword", 10);
const isMatch = await bcrypt.compare("mysecretpassword", hashedPassword);
```

### **Generate JWT Token**
```js
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
const decoded = jwt.verify(token, "your_secret_key");
```

### **Middleware for Auth (Express.js)**
```js
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
```

---

## **4️⃣ Mongoose Advanced Queries**
### **Filtering & Sorting**
```js
const users = await User.find({ verified: true }).sort({ createdAt: -1 }).limit(5);
```

### **Population (Joins)**
```js
const postSchema = new mongoose.Schema({
  title: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Post = mongoose.model("Post", postSchema);

// Fetch posts with user details
const posts = await Post.find().populate("userId");
```

---

## **5️⃣ Extra Commands**
### **Indexing for Performance**
```js
userSchema.index({ email: 1 });
```

### **Transactions (For Atomic Operations)**
```js
const session = await mongoose.startSession();
session.startTransaction();

try {
  await User.create([{ name: "Test User" }], { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

---

This covers **everything** for a **full-stack CRUD app with authentication** using MongoDB and Mongoose! 🚀 Let me know if you need anything more.
