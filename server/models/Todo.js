const {Schema} = require('mongoose');

const schema = new Schema({
    title: String,
    isComplete: {type: Boolean, default: false}
});

module.exports = schema;