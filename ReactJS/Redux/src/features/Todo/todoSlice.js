import { createSlice , nanoid } from '@reduxjs/toolkit';
import { text } from 'express';

const initialState = {
     todos : [{id : 1 , text : "Hellow world"}]
};

export const counterSlice = createSlice({
  name: 'todo', // Name of the slice
  initialState,
  reducers: {
    addTodo : (state , action) => {
        const todo = {
            id : nanoid(),  // Generate unique id
            text : action.payload.text
        }
        state.todos.push(todo);
    },
    removeTodo : (state , action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
  },
});

// Export actions for use in components
export const {addTodo , removeTodo} = todoSlice.actions;

// Export reducer for store configuration
export default todoSlice.reducer;