const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./config/db"); 

const routes = require("./routes/admin")

const errorController = require('./controllers/error');
const Blog = require('./models/userModel');
const Comment = require('./models/comment');

const cors = require('cors'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);


//app.use(errorController.get404);
Comment.belongsTo(Blog, { constraints: true, onDelete: 'CASCADE' });
Blog.hasMany(Comment);


sequelize.sync(
    { force: true }
).then((result)=>{
    console.log(result);
    app.listen(4000);
}).catch((err)=>{
    console.log(err)
});