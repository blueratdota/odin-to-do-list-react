import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  SvgIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Fade,
  Checkbox
} from "@mui/material";
import PriorityCircle from "./PriorityCircle";
import EditDialog from "./EditDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ToDoItem = ({
  toDo,
  toDoData,
  setToDoData,
  recentActions,
  setRecentActions
}) => {
  const [currentData, setCurrentData] = useState(toDo);
  // console.log(currentData);
  useEffect(() => {
    setToDoData(
      toDoData.map((toDo) => {
        if (toDo.id == currentData.id) {
          return { isDone: !currentData.isDone, ...currentData };
        } else return toDo;
      })
    );
    // console.log("updated to do");
  }, [currentData]);
  const dialogRef = useRef(null);
  const handleDelete = () => {
    setRecentActions([
      ...recentActions,
      {
        id: uuidv4(),
        text: `${currentData.title}`,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        action: "Deleted"
      }
    ]);
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
  const handleDoneBtn = () => {
    // console.log(currentData.isDone);
    setCurrentData({ ...currentData, isDone: !currentData.isDone });
    // setCurrentData({ ...currentData, isDone: !isDone });
  };

  return (
    <div className="pr-4">
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
            <div>Not included in a project</div>
          )}
          <p className="font-bold mt-2">Details:</p>
          <div className="indent-4">{toDo.details}</div>
        </AccordionDetails>
        <AccordionActions className="flex mr-10 mb-2">
          <div
            className={`div-button ${currentData.isDone ? `bg-green-500 font-bold` : null} `}
            onClick={handleDoneBtn}
          >
            Done
          </div>
          <div className="div-button">
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
          <div className="div-button" onClick={handleDelete}>
            Delete
          </div>
        </AccordionActions>
      </Accordion>
    </div>
  );
};
export default ToDoItem;
