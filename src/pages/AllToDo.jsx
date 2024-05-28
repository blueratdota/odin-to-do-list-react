import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";


const AllToDo = () => {
    const [toDoData, notesData] = useOutletContext()

    return (
        <>
            <AddToDo />
            <ToDoList toDoData={toDoData} />
        </>

    )

}
export default AllToDo 