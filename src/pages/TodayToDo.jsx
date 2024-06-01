import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";


const TodayToDo = () => {
    const context = useOutletContext()
    // console.log(context.currentPage);
    // console.log(context.toDoData);
    // console.log(context.setToDoData);
    return (
        <div className="flex flex-col gap-2">
            <AddToDo />
            <ToDoList toDoData={context.toDoData} currentPage={context.currentPage} />
        </div>

    )
}
export default TodayToDo