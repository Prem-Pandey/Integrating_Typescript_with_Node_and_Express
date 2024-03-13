"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos = [];
var router = (0, express_1.Router)();
router.get('/', function (req, res, next) {
    res.status(200).json({ todos: todos });
});
router.post('/todo', function (req, res, next) {
    var body = req.body;
    var newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', function (req, res, next) {
    var params = req.params;
    var tid = params.todoId;
    var body = req.body;
    var todoIndex = todos.findIndex(function (todoItem) { return todoItem.id === tid; });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: tid, text: body.text };
        res.status(200).json({ message: 'Updated Todo', todos: todos });
    }
    else {
        res.status(404).json({ message: 'Could not find todo for this id.' });
    }
});
router.delete('/todo/:todoId', function (req, res, next) {
    var params = req.params;
    var tid = params.todoId;
    var initialLength = todos.length;
    todos = todos.filter(function (todoItem) { return todoItem.id !== tid; });
    if (todos.length < initialLength) {
        res.status(200).json({ message: 'Deleted todo', todos: todos });
    }
    else {
        res.status(404).json({ message: 'Could not find todo for this id.' });
    }
});
exports.default = router;
