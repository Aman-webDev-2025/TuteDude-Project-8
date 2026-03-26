const todoModel = require('../models/todoModel');

//search todo
exports.searchTodos = async(req , res) =>  {
    try{
        console.log("searching todo..")
        const query = req.query.q;
        const result = await todoModel.find({
            title: {$regex: query, $options: 'i'}
        })
        res.status(200).json(result);
    }
    catch(error){
        console.log("error in searching");
        res.status(500).json({message: "error in searching"})
    }
}



//get all todos
exports.getAllTodos = async(req , res) => {
    try{
        console.log("Fetching all todos..");
        const todos = await todoModel.find();
        res.status(200).json(todos);
    }
    catch(error){
        console.log("Error in fetching all todos" , error);
        res.status(500).json({message: "Error in fetching all todos"})
    }
}



//get single todo
exports.getTodoById = async(req , res)=>{
    try{
        const todo = await todoModel.findById(req.params.id);
        res.status(200).json(todo);
    }
    catch(error){
        console.log("Todo not found");
        res.status(404).json({message: "Todo not found"})
    }
}



//add new todos
exports.createTodo = async(req , res)=>{
    try{
        const {title} = req.body;

        if(!title || title.trim() === ""){
            return res.status(400).json({message: "Title is required"});
        }

        const newTodo = new todoModel({
            title: title,
            isCompleted: false
        })

        const savedTodo = await newTodo.save();
        console.log("Added new todo" , savedTodo.title);
        res.status(201).json(savedTodo);
    }
    catch(error){
        console.log("Error in adding new todo" , error);
        res.status(500).json({message: "Error in adding new todo"});
    }
}



//update todo
exports.updateTodoById = async(req , res)=>{
    try{
        const updated = await todoModel.findByIdAndUpdate(
            req.params.id,
            {title: req.body.title},
            {new: true}
        ) 
        res.status(200).json(updated);
    }
    catch(error){
        console.log("Update has failed");
        res.status(500).json({message: "Update has failed"})
    }
}




//update status
exports.updateStatus = async(req , res) => {
    try{
        const todo = await todoModel.findById(req.params.id);
        if(!todo) return res.status(404).json({message: "Todo not found"});

        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        res.status(200).json(todo);
    }
    catch(error){
        console.log("Update failed")
        res.status(500).json({message: "Update failed"});
    }
}




//delete todo
exports.deleteTodoById = async(req , res)=>{
    try{
        const deleted = await todoModel.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message: "No todos found"});
        
        console.log("Deleted Id:" , req.params.id);
        res.status(200).json({message: "Todo has been deleted"});
    }
    catch(error){
        console.log("delete failed");
        res.status(500).json({message: "delete failed"})
    }
}