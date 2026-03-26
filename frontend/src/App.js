import './index.css';
import { useEffect , useState } from "react";
import * as api from './api';


function App() {

  const [todos , setTodos]= useState([]);
  const [title , setTitle] = useState("");
  const [todoId , setTodoId] = useState(null); //for update
  const [updateTodo , setUpdateTodo] = useState("");
 
  const [loading , setLoading]= useState(false);
  const [error , setError] = useState("");

  //load todos
  useEffect(()=> {
    fetchTodos();
  },[]);


  //get all todos
  const fetchTodos= async() =>{
    setLoading(true);
    try{
      const res= await api.getTodos();
      setTodos(res.data);
    }
    catch(error){
      setError("Please check your connection");
    }
    finally{
      setLoading(false);  
    }
    
  }


  //add todo
  const handleAddTodo =async()=>{
    setError("");
    if(!title.trim()){
      setError("Please enter todo for adding");
      return;
    }
    setLoading(true);
    try{
      const res= await api.addTodo({title: title});
      setTodos(prev => [res.data , ...prev])
      setTitle("");
    }
    catch(error){
      setError("Cant add todo Try again later");
    }
    finally{
      setLoading(false);  
    }
  }


  //update status of todo
  const handleTodoStatus = async(id , status)=>{
    setError("");
    setLoading(true);
    try{  
      await api.updateTodoStatus(id );
      setTodos(prev =>
        prev.map(e =>
          e._id === id ? {...e, isCompleted: !e.isCompleted} : e
        )
      )
    }
    catch(error){
      setError("Can't update status of your todo");
    }
    finally{
      setLoading(false);  
    }
  }



  //update title of todo
  const handleTodoUpdate = async(id)=>{
    setError("");
    if(!updateTodo.trim()){
      setError("Please enter todo for update");
      return;
    }
    setLoading(true);
    try{
      await api.updateTodoTitle(id , updateTodo);
      setTodos(prev =>
        prev.map(e =>
          e._id === id ? {...e, title: updateTodo} : e
        )
      )
      setTodoId(null);
    }
    catch(error){
      setError("Not able to update your todo Please try again");
    }
    finally{
      setLoading(false);  
    }  
  }



  //search todos
  const handleTodoSearch = async(e)=>{
    setError("");
    const value= e.target.value;
    if(!value){
      return fetchTodos();
    }
    setLoading(true);
    try{
      const res = await api.searchTodo(value);
      setTodos(res.data);
    }
    catch(error){
      setError("Error while search todo");
    } 
    finally{
      setLoading(false);  
    }
  }


  //delete todo by id
  const handleTodoDelete =async(id)=>{
    setError("");
    setLoading(true);
    try{
      await api.deleteTodo(id);
      setTodos(prev => prev.filter(e => e._id !== id));
      setLoading(false);  
    }
    catch(error){
      setError("Could not delete todo");
      setLoading(false);  
    } 
  }





    return (
    <div className="bg-gray-300 min-h-screen  flex justify-center py-12">
  <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-slate-300">
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">My Tasks</h1>

      {/*Error message*/}
      {error && (
        <div className="flex justify-between items-center bg-red-100 border border-red-300 text-red-800 px-4 rounded-lg py-2 mb-4 ">
          <p className="text-sm ">{error}</p>
          <button className=" " onClick={() => setError("")}>x</button>
        </div>
      )}

      {/* Search bar*/}
      <div className="mb-4">
        <input 
          className="w-full p-2 pl-4 border border-slate-300 rounded-lg hover:border-black"
          type="text"
          placeholder="Search tasks..."
          onChange={handleTodoSearch}
        />
      </div>

      {/* Add Todo Section */}
      <div className="flex justify-between gap-2 mb-1 ">
        <input 
          className="w-full pl-4 border border-slate-300 hover:border-black rounded-lg "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Todo.."/>

        <button 
          className=" bg-blue-500 hover:bg-blue-700 text-white font-md p-2 px-3 rounded-lg"
          onClick={handleAddTodo}>
          Add
        </button>
      </div>

    
      <br/>

      {/*loading*/}
      {loading && (
        <div className="flex justify-center items-center">
           <p className="text-blue-500 font-bold">Loading todos...</p>
        </div>
      )}
        
      {/* Todo List*/}
      <ul className="">
        {todos.map((item) => (
          <li 
            className="mt-3 flex items-center justify-between bg-slate-100 p-3 rounded-lg border border-slate-200" 
            key={item._id}>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox"
                className="w-4 h-5 cursor-pointer"
                checked={item.isCompleted}
                onChange={() => handleTodoStatus(item._id , item.isCompleted)}
              />

              {todoId === item._id ? (
                <input
                  
                  value={updateTodo}
                  onChange={(e) => setUpdateTodo(e.target.value)}
                  autoFocus
                />
              ) : (
                <span className={`text-slate-700 ${item.isCompleted ? "line-through text-slate-400" : ""}`}>
                  {item.title}
                </span>
              )}
            </div>

            <div className="flex gap-2 ml-4">    
              {todoId === item._id ? (
                <button 
                  className="text-xs font-bold text-green-500 hover:text-green-700"
                  onClick={() => handleTodoUpdate(item._id)}>
                  SAVE
                </button>) 
                :(
                <button 
                  className="text-xs font-bold text-blue-500 hover:text-blue-800 " 
                  onClick={() => { setTodoId(item._id); setUpdateTodo(item.title) }}>
                  EDIT
                </button> )}

              <button 
                className="text-xs font-bold text-red-500 hover:text-red-700"
                onClick={() => handleTodoDelete(item._id)}
              >
                DELETE
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!loading && todos.length === 0 && (
        <p className="text-center text-slate-400 flex justify-center items-center italic">No tasks added above!</p>
      )}
    </div>
  </div>
</div>

  );
}

export default App;
