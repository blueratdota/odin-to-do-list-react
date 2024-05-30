import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";


const AllToDo = () => {
    const [toDoData, notesData] = useOutletContext()

    return (
        <div className="flex flex-col gap-2">
            <AddToDo />
            <ToDoList toDoData={toDoData} />
        </div>

    )

}
export default AllToDo 