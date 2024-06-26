import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList";
import { useOutletContext } from "react-router-dom";

const TodayToDo = () => {
  const context = useOutletContext();
  // console.log(context.currentPage);
  // console.log(context.toDoData);
  // console.log(context.setToDoData);
  return (
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
  );
};
export default TodayToDo;
