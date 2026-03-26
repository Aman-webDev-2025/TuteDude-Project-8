import axios from 'axios';

const API_URL = 'https://tutedude-project-8.onrender.com/todos';

export const getTodos = ()=> axios.get(API_URL);

export const addTodo = (todo)=> axios.post(API_URL , todo);

export const updateTodoTitle = (id , title)=> axios.patch(`${API_URL}/${id}`, {title});

export const deleteTodo = (id)=> axios.delete(`${API_URL}/${id}`);

export const updateTodoStatus = (id , isCompleted)=> axios.patch(`${API_URL}/${id}` , {isCompleted});

export const searchTodo = (query)=> axios.get(`${API_URL}/search?q=${query}`);