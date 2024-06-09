import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList";
import { useOutletContext } from "react-router-dom";

const Projects = () => {
  const context = useOutletContext();
  return (
    <div className="flex flex-col gap-2">
      <ToDoList
        toDoData={context.toDoData}
        setToDoData={context.setToDoData}
        currentPage={context.currentPage}
        projectsData={context.projectsData}
        currentProject={context.currentProjectPage}
        recentActions={context.recentActions}
        setRecentActions={context.setRecentActions}
      />
      <AddToDo />
    </div>
  );
};
export default Projects;
