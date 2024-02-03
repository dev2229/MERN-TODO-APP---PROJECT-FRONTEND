import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        setTodos: (state, action) => {
            return action.payload;
        },
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        updateTodo: (state, action) => {
            const updatedTodo = action.payload;
            const index = state.findIndex((todo) => todo._id === updatedTodo._id);

            if (index !== -1) {
                state[index] = updatedTodo;
            }
        },
        deleteTodo: (state, action) => {
            const idToDelete = action.payload;
            return state.filter((todo) => todo._id !== idToDelete);
        },
    },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;


