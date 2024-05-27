const ToDoList = ({ toDoData, filter }) => {
    return (
        toDoData.map(toDo => {
            return (
                <div key={toDo.id}>{toDo.title}</div>
            )
        })
    )


}

export default ToDoList