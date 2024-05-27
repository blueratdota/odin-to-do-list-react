import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";


const AllToDo = () => {
    const [toDoData, notesData, fungus] = useOutletContext()
    console.log(toDoData.toDo);
    return (
        <ToDoList toDoData={toDoData.toDo} />
    )

}
export default AllToDo 