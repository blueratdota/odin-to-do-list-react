import { useRef } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddProject = ({
  projectsData,
  setProjectsData,
  recentActions,
  setRecentActions
}) => {
  // console.log(projectsData);
  // console.log(context.setProjectsData);
  const [newEntry, setNewEntry] = useImmer({
    title: ""
  });
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
      console.log("close modal");
      dialogRef.current.close();
    }
  };
  const handleTitleInput = (e) => {
    setNewEntry((data) => {
      data.title = e.target.value;
    });
  };

  const checkDuplicateProject = (project) => {
    const projectTitles = projectsData.map((entry) => {
      return entry.title.toLowerCase();
    });
    return projectTitles.includes(project.title.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkDuplicateProject(newEntry)) {
      alert("this project already exists");
    } else {
      setProjectsData([...projectsData, { id: uuidv4(), ...newEntry }]);
      setNewEntry({
        title: ""
      });
      setRecentActions([
        ...recentActions,
        {
          id: uuidv4(),
          text: `${newEntry.title}`,
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toLocaleTimeString(),
          action: "Created project"
        }
      ]);
      dialogRef.current.close();
    }
  };

  return (
    <>
      <button onClick={handleOpen}>Add Project</button>
      <dialog
        className=" w-[40vw] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        ref={dialogRef}
        onClick={handleClickOutside}
      >
        <div className="flex justify-between items-center px-4 py-2 bg-yellow-500">
          <p className="text-xl font-bold">Add new project</p>
          <SvgIcon className=" hover:cursor-pointer" onClick={handleClose}>
            {<CloseIcon />}
          </SvgIcon>
        </div>
        <form action="#" className="flex flex-col p-4 gap-4">
          <input
            onChange={handleTitleInput}
            type="text"
            placeholder="Project Title: Maintenance Activities"
            required
            maxLength={50}
            className="text-3xl border-0 outline-none"
            value={newEntry.title}
          />
        </form>
        <div className="mb-6 mt-3 text-center">
          <button onClick={handleSubmit}>Create Project</button>
        </div>
      </dialog>
    </>
  );
};

export default AddProject;
