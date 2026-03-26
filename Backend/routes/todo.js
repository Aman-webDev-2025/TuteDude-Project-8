const express = require('express');
const router = express.Router();
const {getAllTodos,
    getTodoById,
    createTodo,
    updateTodoById,
    searchTodos,
    updateStatus,
    deleteTodoById
} = require('../controllers/todoController')


router.get('/search' , searchTodos)

router.get('/' , getAllTodos)

router.get('/:id' , getTodoById)

router.post('/' , createTodo)

router.patch('/:id/status' , updateStatus)

router.patch('/:id' , updateTodoById)


router.delete('/:id' , deleteTodoById)



module.exports = router;