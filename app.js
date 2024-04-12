const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./config/db"); 

const routes = require("./routes/admin")

const errorController = require('./controllers/error');

const cors = require('cors'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);


//app.use(errorController.get404);

sequelize.sync().then((result)=>{
    console.log(result);
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
});