

export default function Todolist(props) {

console.log(props)

    const { id, text } = props.data
    const {editText}=props
    const handleDelete = props.deleteTodo
    return <>

        <div className="todo-container">

            <h1>{text}</h1>
            <div>

            <button onClick={() => (handleDelete(id))} style={{ color: "red" }}>delete</button>
            <button onClick={()=>editText(id)}>Edit</button>
            </div>

            
        </div>
    </>

}