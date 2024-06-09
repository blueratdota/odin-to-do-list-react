import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList";
import { useOutletContext } from "react-router-dom";

const WeekToDo = () => {
  const context = useOutletContext();
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-2 min-h-[82dvh]">
        <ToDoList
          toDoData={context.toDoData}
          setToDoData={context.setToDoData}
          currentPage={context.currentPage}
          projectsData={context.projectsData}
          recentActions={context.recentActions}
          setRecentActions={context.setRecentActions}
        />
        <AddToDo />
      </div>
    </div>
  );
};
export default WeekToDo;
