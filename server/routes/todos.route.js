const {check} = require('express-validator');
const auth = require('../middleaware/auth.middleaware')

module.exports = (app) => {
    const todos = require('../controlers/todos.controller');
    const router = require('express').Router();

    router.post(
        "/",
        auth,
        check("title", "Add title").exists(),
        todos.createTodo
    );

    router.get(
        "/",
        auth,
        todos.readTodo
    );

    router.delete(
        "/",
        auth,
        todos.deleteTodo
    )

    app.use("/api/todos", router);
}
