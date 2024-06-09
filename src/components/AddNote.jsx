import { Button, SvgIcon } from "@mui/material";
import { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";

const AddNote = ({
  notesData,
  setNotesData,
  recentActions,
  setRecentActions
}) => {
  const [newEntry, setNewEntry] = useImmer({
    title: "",
    details: ""
  });
  //dialog controls
  const dialogRef = useRef(null);
  const handleOpen = () => {
    dialogRef.current.showModal();
  };
  const handleClose = () => {
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
      //   console.log("close modal");
      dialogRef.current.close();
    }
  };

  //input field controls
  const handleTitleInput = (e) => {
    setNewEntry((data) => {
      data.title = e.target.value;
    });
  };
  const handleDetailsInput = (e) => {
    setNewEntry((data) => {
      data.details = e.target.value;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (noEmptyFields()) {
      setNotesData([
        ...notesData,
        {
          id: uuidv4(),
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toLocaleTimeString(),
          ...newEntry
        }
      ]);
      setNewEntry({ title: "", details: "" });
      setRecentActions([
        ...recentActions,
        {
          id: uuidv4(),
          text: `${newEntry.title}`,
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toLocaleTimeString(),
          action: "Created note"
        }
      ]);
      handleClose();
    } else {
      alert("There are empty fields!");
    }
    // e.preventDefault();
    // if (checkDuplicateProject(newEntry)) {
    //   alert("this project already exists");
    // } else {
    //   setProjectsData([...projectsData, { id: uuidv4(), ...newEntry }]);
    //   setNewEntry({
    //     title: ""
    //   });
    //   dialogRef.current.close();
    // }
  };
  //checks
  const noEmptyFields = () => {
    if (newEntry.title && newEntry.details) {
      return true;
    }
    return false;
  };
  return (
    <div className="max-w-80 bg-white shadow-sm rounded-lg p-4">
      <Button onClick={handleOpen}>click me to add note</Button>
      <dialog
        className=" w-[40vw] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        ref={dialogRef}
        onClick={handleClickOutside}
      >
        <div className="flex justify-between items-center px-4 py-2 bg-yellow-500">
          <p className="text-xl font-bold">Add new note</p>
          <SvgIcon className="stroke-[10px]" onClick={handleClose}>
            {<CloseIcon />}
          </SvgIcon>
        </div>
        <form action="#" className="flex flex-col p-4 gap-4">
          <input
            onChange={handleTitleInput}
            type="text"
            placeholder="Stick notes titile"
            required
            maxLength={50}
            className="text-3xl border-0 outline-none"
            value={newEntry.title}
          />
          <textarea
            onChange={handleDetailsInput}
            name="details"
            id="details"
            cols={30}
            rows={8}
            placeholder="Note details..."
            required
            maxLength={500}
            className="text-xl border-0 outline-none"
            value={newEntry.details}
          ></textarea>
        </form>
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button>Cancel</Button>
        </div>
      </dialog>
    </div>
  );
};
export default AddNote;
