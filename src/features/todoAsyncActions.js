import { setTodos, addTodo, updateTodo, deleteTodo } from './todoSlice';
import axios from 'axios';

const apiUrl = 'https://mern-todo-app-backend-l0xh.onrender.com/api/todos';

export const fetchTodos = () => async (dispatch) => {
    try {
        const response = await axios.get(apiUrl);
        dispatch(setTodos(response.data));
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

export const createTodo = (todo) => async (dispatch) => {
    try {
        const response = await axios.post(apiUrl, todo);
        dispatch(addTodo(response.data));
    } catch (error) {
        console.error('Error creating todo:', error);
    }
};

export const updateTodoAsync = (id, updatedTodo) => async (dispatch) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, updatedTodo);
        dispatch(updateTodo(response.data));
    } catch (error) {
        console.error('Error updating todo:', error);
        // You might want to handle the error, throw, or dispatch another action
    }
};


export const deleteTodoAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        dispatch(deleteTodo(id));
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};

