

import { useEffect, useState } from "react";
import Loading from "./component/Loading"
import Todolist from "./component/Todolist"
import "./App.css"


function App() {
  const [userInput, setUserInput] = useState("");
  const [update, setUpdate] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);




  //fectch api fun
  async function apiCallTodo() {
    const apiUrl = "https://todo-1-8rc6.onrender.com/todo";

    const res = await fetch(apiUrl, { method: "GET" });

    if (res.ok) {
      const data = await res.json();
      setLoading(false)
      setRes(data)
    } else {
      setLoading(true)
    }

  }
  //post api function
  const postApiData = () => {
    const api = "https://todo-1-8rc6.onrender.com/post";
    const method = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: Date.now(), text: userInput }) }
    fetch(api, method);
    apiCallTodo()

    setUserInput("")
  }

  //edit
  const editText=(id)=>{
    let text=res.find(e=>(e.id===id))
    setUserInput(text.text)
    setUpdate({id:id})

  }
  


  //api function
  function handleDelete(id) {
  
    const api = `https://todo-1-8rc6.onrender.com/delete/${id}`;
    const method = { method: "DELETE" }
    fetch(api, method);
    apiCallTodo();
  }

  function handleAdd(e) {
    e.preventDefault();

    postApiData()
  }

  useEffect(() => {
    apiCallTodo()

  }, [])


function handleUpdate(){

 

    const api = "https://todo-1-8rc6.onrender.com/update";
    const method = { method: "put", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id:update.id,text:userInput }) }
    fetch(api, method);
    apiCallTodo()
    setUserInput("")
    setUpdate("")

}



  return <>
    <center>
      <h1 style={{ color: "blue" }}>TODO TASK LIST</h1>
      <form onSubmit={handleAdd} >

      <input type="text"   value={userInput} placeholder="Type Here" onChange={e => (setUserInput(e.target.value))} />
      <div>

      <button disabled={update!==""} style={{color:update===""?"blue":"white"}} type="submit" >Add</button>
      <button disabled={update===""} style={{color:update!==""?"blue":"white"}} onClick={handleUpdate} type="button" >Update</button>
      </div>
      </form>


   
    </center>
    {loading && <Loading />}
    {!loading &&

      res.map(e => {
        return (

          <>
            <Todolist key={e.id} data={e} editText={editText} deleteTodo={handleDelete} />
          </>
        )

      })


    }











  </>

}


export default App;
















