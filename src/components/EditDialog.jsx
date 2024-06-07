import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import PriorityCircle from "./PriorityCircle";
import { useOutletContext } from "react-router-dom";
//mui imports
import {
  Switch,
  SvgIcon,
  FormLabel,
  FormControlLabel,
  FormControl,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import Select from "react-select";
import CloseIcon from "@mui/icons-material/Close";
import _default from "react-select";

const EditDialog = ({ dataEdit, handleClose, toDoData }) => {
  const [toEdit, setToEdit] = useImmer(dataEdit);
  const context = useOutletContext();
  const [prevSelect, setPrevSelect] = useState();

  //inputfields
  function handleTitleInput(e) {
    setToEdit((data) => {
      data.title = e.target.value;
    });
  }
  function handleDetailsInput(e) {
    setToEdit((data) => {
      data.details = e.target.value;
    });
  }
  function handleDateInput(e) {
    setToEdit((data) => {
      data.dueDate = e.target.value;
    });
  }
  function handleSelectPriority(e, x) {
    setToEdit((data) => {
      data.priority = e.target.value;
    });
  }

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 bg-yellow-500">
        <p className="text-xl font-bold">Edit To Do Entry</p>
        <SvgIcon className="stroke-[10px]" onClick={handleClose}>
          {<CloseIcon />}
        </SvgIcon>
      </div>
      <div>{toEdit.title}</div>
      <div>{toEdit.priority}</div>
      <div>
        <form action="submit" className="flex flex-col p-4 gap-4">
          <input
            onChange={handleTitleInput}
            type="text"
            required
            maxLength={50}
            className="text-2xl border-0 outline-none"
            value={toEdit.title}
          />
          <textarea
            onChange={handleDetailsInput}
            name="details"
            id="details"
            cols={30}
            rows={8}
            required
            maxLength={500}
            className="text-xl border-0 outline-none"
            value={toEdit.details}
          ></textarea>
          {/* <div>
            <FormControl className="flex flex-row">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localEdit.inProject}
                      onChange={handleSwitch}
                      disabled={context.projectsData.length <= 0}
                    />
                  }
                  label={
                    !context.projectsData.length
                      ? "Create a project first"
                      : "In Project?"
                  }
                />
              </FormGroup>
              <Select
                options={options}
                isDisabled={!localEdit.inProject}
                onChange={handleSelect}
                className="w-96"
              ></Select>
            </FormControl>
          </div> */}
          <label htmlFor="input-date" className="text-xl font-bold">
            Due date:
            <input
              onChange={handleDateInput}
              className="ml-2 p-1 px-4 rounded-lg border border-yellow-500 outline-yellow-600 text-lg font-thin"
              type="date"
              id="input-date"
              value={toEdit.dueDate}
              required
            />
          </label>
          <div className="flex items-center justify-between">
            <div>
              <p>Priority</p>
              <ToggleButtonGroup
                value={toEdit.priority}
                exclusive
                onChange={handleSelectPriority}
                aria-label="Platform"
                className="h-8"
              >
                <ToggleButton
                  value="low"
                  className={`${toEdit.priority == "low" ? "bg-green-500 font-bold" : "bg-green-100"}`}
                >
                  LOW
                </ToggleButton>
                <ToggleButton
                  value="medium"
                  className={`${toEdit.priority == "medium" ? "bg-yellow-500 font-bold" : "bg-yellow-100"}`}
                >
                  MEDIUM
                </ToggleButton>
                <ToggleButton
                  value="high"
                  className={`${toEdit.priority == "high" ? "bg-red-500 font-bold" : "bg-red-100"}`}
                >
                  HIGH
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            {/* <Button
              //   onClick={handleSubmit}
              variant="outlined"
              className="mr-10 w-40"
            >
              Submit
            </Button> */}
            <div>ree</div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditDialog;
