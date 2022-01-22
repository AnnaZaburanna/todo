const Todo = require('../models/Todo')
const User  = require('../models/User')
const {ObjectId} = require("mongodb");
// /api/todos/  create
exports.createTodo = async (req, res) => {
    try {
        const {title} = req.body;
        const todo = {title};
        const payload = { $push: {"todos": todo}}
        const _id = req.user.userId;
        const result = await User.updateOne({_id}, payload);
        res.status(201).json({message: 'Your todo was added'})
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again', error: e })
    }
}

exports.readTodo = async (req, res) => {
    try {
       const todos = await Todo.find({});
       res.status(200).json({message: 'All your todos', todos})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong', error: e });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.query;
        const payload = { $pull: {"todos": { "_id": id }} };
        const _id = req.user.userId;
        const result = await User.updateOne({_id}, payload);
        res.status(200).json({ message: "Your todo was deleted", detail: result});
    } catch (e) {
        res.status(500).json({ message: "Something went wrong", error: e });
    }
}