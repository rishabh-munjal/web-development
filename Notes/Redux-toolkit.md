
# **Redux Cheatsheet**

### **Step 1: Setup the Redux Folder**

`npm install @reduxjs/toolkit react-redux`

Create a folder named `app` inside the `src` folder and add a `store.js` file to it.

---

### **Step 2: Configure the Store**
Define your store in `store.js`:
```javascript
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {}, // Add reducers here
});
```

---

### **Step 3: Provide Store Access in the Application**
In `main.jsx` or your main rendering file, wrap your `App` component with the `Provider`:
```javascript
import { store } from './redux/store';
import { Provider } from 'react-redux';

<Provider store={store}>
  <App />
</Provider>
```

---

### **Step 4: Create a Slice**
A **slice** represents a specific piece of state and associated logic (reducers and actions).  
Example: Create `counterSlice.js` in `src/features/counter/`:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0, // Default state value
};

export const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  initialState,
  reducers: {
    increment: (state) => {   
      state.value += 1; // Immer handles immutability
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Handle custom payload
    },
  },
});

// Export actions for use in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer for store configuration
export default counterSlice.reducer;
```

`state ` and `actions` are the default parameters provided in which `state` gives the **hand to hand information** of the state & `action` is to get some values for the reducer

---

### **Step 5: Add Slice Reducers to the Store**
Import and add the slice reducer to the store:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add slices here
  },
});
```

---

### **Step 6: Use Redux State and Actions in React Components**

#### **1. Import Redux Hooks and Actions**
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/counter/counterSlice';
```

#### **2. Access State with `useSelector` [used to dispaly values]**
```javascript
const count = useSelector((state) => state.counter.value); // Access counter state
```

#### **3. Dispatch Actions with `useDispatch`**
```javascript
const dispatch = useDispatch();

<button onClick={() => dispatch(increment())}>Increment</button>
<button onClick={() => dispatch(decrement())}>Decrement</button>


const functionEg = (e) =>{
    dispatch(addTodo(input)) //here input is the state which would be available to payload
}
```

---

