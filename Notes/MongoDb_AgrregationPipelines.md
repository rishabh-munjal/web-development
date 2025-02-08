### MongoDB Aggregation Pipelines in Detail

MongoDB **aggregation pipelines** are a framework for processing and transforming data within a collection. They work as a sequence of stages, where each stage processes the data and passes it to the next stage.

---

## 📌 **1. What is an Aggregation Pipeline?**
An **aggregation pipeline** is a framework for performing data aggregation operations, similar to SQL's `GROUP BY` but more powerful and flexible.

### **Syntax:**
```json
db.collection.aggregate([
    { stage1 },
    { stage2 },
    { stage3 },
    ...
])
```
Each stage processes the documents and passes them to the next stage.

---

## 📌 **2. Key Aggregation Stages**
### ✅ **$match** (Filtering Documents)
Works like the `find()` query, filtering documents based on conditions.
```json
db.orders.aggregate([
    { $match: { status: "shipped" } }
])
```
- This filters documents where `status` is `"shipped"`.

---

### ✅ **$project** (Shaping the Output)
Controls which fields should be included or excluded.
```json
db.orders.aggregate([
    { $project: { _id: 0, customerName: 1, totalAmount: 1 } }
])
```
- This includes only `customerName` and `totalAmount`, excluding `_id`.

---

### ✅ **$group** (Grouping Data)
Groups documents based on a field and performs aggregation (like SQL `GROUP BY`).
```json
db.orders.aggregate([
    {
        $group: {
            _id: "$customerName",  
            totalSpent: { $sum: "$totalAmount" },
            orderCount: { $count: {} }
        }
    }
])
```
- Groups by `customerName`
- Calculates `totalSpent` (sum of `totalAmount`)
- Counts number of orders

---

### ✅ **$sort** (Sorting Documents)
Sorts documents in ascending (`1`) or descending (`-1`) order.
```json
db.orders.aggregate([
    { $sort: { totalAmount: -1 } }
])
```
- Sorts orders by `totalAmount` in descending order.

---

### ✅ **$limit & $skip** (Pagination)
- **$limit** → Limits the number of documents.
- **$skip** → Skips a given number of documents.
```json
db.orders.aggregate([
    { $sort: { totalAmount: -1 } },
    { $skip: 10 },
    { $limit: 5 }
])
```
- Skips first 10 documents and retrieves the next 5.

---

### ✅ **$unwind** (Deconstructs Arrays)
Breaks an array field into multiple documents.
```json
db.orders.aggregate([
    { $unwind: "$items" }
])
```
- If an order has an array of `items`, it creates separate documents for each item.

---

### ✅ **$lookup** (Joining Collections)
Performs a left join with another collection.
```json
db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customerDetails"
        }
    }
])
```
- Joins `orders` with `customers` where `customerId` matches `_id`.

---

### ✅ **$addFields** (Adding New Fields)
Creates new computed fields.
```json
db.orders.aggregate([
    {
        $addFields: {
            discountApplied: { $multiply: ["$totalAmount", 0.1] }
        }
    }
])
```
- Adds a `discountApplied` field which is 10% of `totalAmount`.

---

### ✅ **$out** (Saving Aggregated Data)
Saves the output into a new collection.
```json
db.orders.aggregate([
    { $match: { status: "shipped" } },
    { $out: "shipped_orders" }
])
```
- Stores the result in `shipped_orders` collection.

---

## 📌 **3. Example Use Case**
### 🔹 **Scenario:** 
You have an `orders` collection:
```json
[
    { _id: 1, customerName: "Alice", totalAmount: 100, status: "shipped" },
    { _id: 2, customerName: "Bob", totalAmount: 200, status: "pending" },
    { _id: 3, customerName: "Alice", totalAmount: 150, status: "shipped" }
]
```

### 🔹 **Goal:** 
Find the total amount spent by each customer on shipped orders.

### 🔹 **Aggregation Pipeline:**
```json
db.orders.aggregate([
    { $match: { status: "shipped" } },
    {
        $group: {
            _id: "$customerName",
            totalSpent: { $sum: "$totalAmount" }
        }
    }
])
```
### 🔹 **Output:**
```json
[
    { _id: "Alice", totalSpent: 250 }
]
```

---

## 📌 **4. Optimization Tips**
1. **Use `$match` early** → Reduce the number of documents at the start.
2. **Index fields** used in `$lookup`, `$match`, and `$sort`.
3. **Avoid `$unwind` on large arrays** if not needed.
4. **Use `$project` to remove unused fields** for better performance.

---

## 📌 **5. Hands-on Practice**
You can practice MongoDB aggregation pipelines using:
- **MongoDB Atlas**
- **MongoDB Compass (GUI tool)**
- **`mongosh` (MongoDB Shell)**

---

