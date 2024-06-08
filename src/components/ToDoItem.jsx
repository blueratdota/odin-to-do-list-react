import { useRef, useState } from "react";

import {
  SvgIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Fade
} from "@mui/material";
import PriorityCircle from "./PriorityCircle";
import EditDialog from "./EditDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ToDoItem = ({ toDo, toDoData, setToDoData }) => {
  const [currentData, setCurrentData] = useState(toDo);
  const dialogRef = useRef(null);
  const handleDelete = () => {
    setToDoData(toDoData.filter((a) => a.id !== currentData.id));
  };
  const handleOpen = () => {
    setCurrentData(toDo);
    dialogRef.current.showModal();
  };
  const handleClose = () => {
    // console.log("close modal");
    dialogRef.current.close();
  };
  const handleClickOutside = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      handleClose();
    }
  };

  return (
    <div className="">
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
              <span className="font-bold">{`Project ${toDo.projectName}`}</span>
            </div>
          ) : (
            <div>Not in a project</div>
          )}
          <p className="font-bold">Details:</p>
          <div>{toDo.details}</div>
        </AccordionDetails>
        <AccordionActions>
          <div>
            <p onClick={handleOpen}>Edit</p>
            <dialog
              ref={dialogRef}
              onClick={handleClickOutside}
              className=" w-[40vw] pb-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] normal-case"
            >
              <EditDialog
                dataEdit={currentData}
                handleClose={handleClose}
                dialogRef={dialogRef}
                toDoData={toDoData}
                setToDoData={setToDoData}
              ></EditDialog>
            </dialog>
          </div>
          <Button onClick={handleDelete}>Delete</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};
export default ToDoItem;
