import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  SvgIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Fade
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isSameDay, isSameWeek } from "date-fns";
import PriorityCircle from "./PriorityCircle";

const ToDoList = ({ toDoData, currentPage, currentProject }) => {
  console.log(currentPage);

  const today = new Date().toISOString().slice(0, 10);
  const completeToDoList = toDoData;
  console.log(currentPage);
  console.log(currentProject);

  let filteredToDo = [];

  if (currentPage == "all-to-do") {
    filteredToDo = toDoData;
  }
  if (currentPage == "today-to-do") {
    filteredToDo = completeToDoList.filter((entry) => {
      return isSameDay(today, entry.dueDate);
    });
  }
  if (currentPage == "week-to-do") {
    console.log("WEEK to do");
    filteredToDo = completeToDoList.filter((entry) => {
      return isSameWeek(today, entry.dueDate);
    });
  }
  if (currentPage == "projects-to-do") {
    console.log("project to do");
    filteredToDo = completeToDoList.filter((entry) => {
      return entry.projectName == currentProject;
    });
  }

  return filteredToDo.map((toDo) => {
    return (
      <div className="w-[75%]" key={toDo.id}>
        <Accordion className="rounded-lg text-xl shadow-sm">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            slots={{ transition: Fade }}
          >
            <div className="flex flex-row items-center grow ">
              <div className="flex items-center gap-4 grow basis-[75%]">
                <PriorityCircle priority={toDo.priority}></PriorityCircle>
                <div className="font-bold">{toDo.title}</div>
              </div>
              <div className="grow basis-auto">Due date: {toDo.dueDate}</div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {toDo.inProject ? (
              <div>
                Included in{" "}
                <span className="font-bold">{toDo.projectName}</span>
              </div>
            ) : (
              <div>no</div>
            )}
            <div>{toDo.details}</div>
          </AccordionDetails>
          <AccordionActions>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </AccordionActions>
        </Accordion>
      </div>
    );
  });
};

export default ToDoList;
