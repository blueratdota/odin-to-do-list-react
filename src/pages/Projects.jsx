import AddToDo from "../components/AddToDo";
import ToDoList from "../components/ToDoList";
import { useOutletContext } from "react-router-dom";

const Projects = () => {
  const context = useOutletContext();
  return (
    <div className="flex flex-col gap-2">
      <ToDoList
        toDoData={context.toDoData}
        currentPage={context.currentPage}
        currentProject={context.currentProjectPage}
      />
    </div>
  );
};
export default Projects;
