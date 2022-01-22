const express = require ("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const User = require('../server/models/User')

const app = express();
const port = 3002;
// const url = "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

app.use(bodyParser.json({extended: true}))

require("./routes/auth.route")(app);
require("./routes/todos.route")(app);

async function run() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/usersdb",
            {
                useUnifiedTopology: true, useNewUrlParser: true
            });
        // const user = new User ({
        //     email: "ann4@com",
        //     password: "221202d"
        // });
        //
        // user.save(function (err){
        //     // mongoose.disconnect();
        //
        //     if (err) return console.log(err);
        //     console.log("Сохранен объект", user);
        // });
        app.listen(port, () => {
            console.log(`App has been started on ${port}`)
        })
    }catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
run();




// async function start() {
//     try {
//         await mongoClient.connect();
//         const db = mongoClient.db("usersdb");
//         const collection = db.collection("usersdb");
//         // const result = await db.command({ ping:1 });
//         let user = {email: "anna@com", password: "221202"};
//         const result = await collection.insertOne(user);
//         console.log(result);
//         console.log(user);
//         console.log("Подключение с сервером успешно установлено");
//         console.log(result);
//     } catch (err) {
//         console.log("Возникла ошибка");
//         console.log(err);
//     }
    // }finally{
    //     await mongoClient.close();
    //     console.log("Подключение закрыто");
    // }
// }
// start();
        // await mongoose.connect((url), {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // })





