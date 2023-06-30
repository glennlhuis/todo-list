const express = require('express');
const todoController = require ('../controller/todoController');

const router = express.Router();

// Create a new todo
router.post('/', async(req,res) => {
    try {
        const {title} = req.body;
        const todo = await todoController.createTodo(title);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Read all todos
router.get('/', async(req,res) => {
    try {
        const todos = await todoController.getAllTodos();
        res.status(201).json(todos);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Read a single todo
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const todo = await todoController.getTodoById(id);
        res.json(todo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Update a todo
router.put('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {title} = req.body;
        const updatedTodo = await todoController.updateTodoById(id, title);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Delete a todo
router.delete('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const todo = await todoController.deleteTodoById(title);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
