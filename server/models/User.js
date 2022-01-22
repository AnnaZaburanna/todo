const {Schema, model} = require("mongoose");
const Todo =  require("./Todo")
const schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    todos: [ Todo ]
});

module.exports = model('User', schema);