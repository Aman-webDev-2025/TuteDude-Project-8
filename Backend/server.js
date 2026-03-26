const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const todoRoutes = require('./routes/todo');

const DbConnection = require('./db');
DbConnection();

//express app
const app = express();

//middleware
app.use(cors());


app.use(express.json());
app.use((req , res , next) => {
    console.log(req.path , req.method)
    next();
})

//routes for home page
app.get('/' , (req , res) => {
    res.status(200).json({msg: "Home page"})
})

//routes for todos
app.use('/todos' , todoRoutes); 

app.use((req , res) => {
    res.status(404).json({
        success: false,
        message: "route not found"
    })
})

//port
const PORT = process.env.PORT;


app.listen(PORT , () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})