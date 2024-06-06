import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from 'uuid';
import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";

//mui imports
// import SvgIcon from '@mui/material/SvgIcon';
import { Switch, SvgIcon, FormGroup, FormControlLabel, FormControl, NativeSelect } from "@mui/material";
import Select from 'react-select'
import CloseIcon from '@mui/icons-material/Close';
import _default from "react-select";

const AddToDo = () => {
    const context = useOutletContext()
    console.log(context.toDoData);
    // console.log(context.setToDoData);
    // const [toDoData, setToDoData] = useOutletContext()
    const [newEntry, setNewEntry] = useImmer({
        "title": '',
        "details": '',
        "dueDate": '',
        "priority": '',
        "inProject": false,
        "projectName": null
    })

    //handles modal
    //use ref for toggling showModal() and  close()
    //handleClickOutside for closing the modal if anything outside the modal is clicked
    const dialogRef = useRef(null)

    const handleOpen = () => {
        dialogRef.current.showModal()

    }
    const handleClose = () => {
        dialogRef.current.close()

    }
    const handleClickOutside = (e) => {
        const dialogDimensions = dialogRef.current.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            console.log('close modal');
            handleClose()
        }
    }

    //inputfields
    const handleTitleInput = (e) => {
        setNewEntry((data) => { data.title = e.target.value })
    }
    const handleDetailsInput = (e) => {
        setNewEntry((data) => { data.details = e.target.value })
    }
    const handleDateInput = (e) => {
        setNewEntry((data) => { data.dueDate = e.target.value })
    }
    const handleSelectPriority = (e) => {
        setNewEntry((data) => { data.priority = e.target.value })
    }
    const handleSwitch = (e) => {
        setNewEntry((data) => { data.inProject = !data.inProject })
    }
    const handleSelect = (e) => {
        setNewEntry((data) => { data.projectName = e.value })

    }
    //checking input fields
    const checkFields = () => {
        if (newEntry.title && newEntry.details && newEntry.dueDate && newEntry.priority) {
            return true
        }
        return false
    }
    const checkDuplicateToDo = (toDo) => {
        const toDoTitles = context.toDoData.map((entry) => {
            return JSON.stringify({ title: entry.title.toLowerCase(), dueDate: entry.dueDate })
        })
        return toDoTitles.includes(JSON.stringify({ title: toDo.title.toLowerCase(), dueDate: toDo.dueDate }))
    }


    //button submit function
    const handleSubmit = (e) => {
        e.preventDefault()
        //for project toDo
        if (checkDuplicateToDo(newEntry)) {
            alert('duplicate entry')
            return
        }
        if (newEntry.inProject) {
            if (!newEntry.projectName) {
                alert('no project input')
            }
            else {
                context.setToDoData([...context.toDoData, { "id": uuidv4(), ...newEntry, }])
                setNewEntry({
                    "title": '',
                    "details": '',
                    "dueDate": '',
                    "priority": '',
                    "inProject": false,
                    "projectName": null
                })
                dialogRef.current.close()
            }

        }
        // for not in project toDo
        else {
            if (checkFields()) {
                context.setToDoData([...context.toDoData, { "id": uuidv4(), ...newEntry, }])
                setNewEntry({
                    "title": '',
                    "details": '',
                    "dueDate": '',
                    "priority": '',
                    "inProject": false,
                    "projectName": null
                })

                dialogRef.current.close()
            }
            else {
                alert('empty field / duplicate title')
            }

        }

    }

    const options = context.projectsData.map((project) => {
        return (
            { value: project.title, label: project.title }
        )
    })

    return (
        <div className="flex bg-white shadow-sm rounded-lg text-lg w-[75%] min-h-[48px] px-4 items-center">
            <p onClick={handleOpen} className="w-full" >Add something to do - #of entries <span>{context.toDoData.length}</span></p>
            <dialog
                ref={dialogRef}
                onClick={handleClickOutside}
                className=" w-[40vw] h-[600px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" >
                <div className="flex justify-between items-center px-4 py-2 bg-yellow-500">
                    <p className="text-xl font-bold">Add new To Do Entry</p>
                    <SvgIcon className="stroke-[10px]" onClick={handleClose}>{<CloseIcon />}</SvgIcon>


                    {/* <SvgIcon className="stroke-[10px]" onClick={handleClose}>{<CloseIcon />}</SvgIcon> */}
                </div>
                <div>
                    <form action="submit" className="flex flex-col p-4 gap-4" >
                        <input onChange={handleTitleInput} type="text" placeholder="Title: Clean my wardrobe" required maxLength={50} className="text-2xl border-0 outline-none" value={newEntry.title} />
                        <textarea onChange={handleDetailsInput} name="details" id="details" cols={30} rows={8} placeholder="Details: fold shirts, iron uniform" required maxLength={400} className="text-xl border-0 outline-none" value={newEntry.details}></textarea>
                        <div>
                            <FormControl className="flex flex-row">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={newEntry.inProject}
                                            onChange={handleSwitch}
                                            disabled={context.projectsData.length <= 0}
                                        />} label={!context.projectsData.length ? "Create Project First" : "In Project?"} />
                                </FormGroup>
                                <Select
                                    options={options}
                                    isDisabled={!newEntry.inProject}
                                    onChange={handleSelect}
                                >
                                </Select>
                            </FormControl>
                        </div>
                        <label htmlFor="input-date" className="text-xl font-bold">
                            Due date:
                            <input onChange={handleDateInput} className="ml-2 p-1 px-4 rounded-lg border border-yellow-500 outline-yellow-600 text-lg font-thin" type="date" id="input-date" value={newEntry.dueDate} required />
                        </label>
                        <div>
                            <div>
                                <label htmlFor="input-priority" className="text-xl font-bold priority-options">
                                    Priority:
                                    <input onChange={handleSelectPriority} type="radio" id={"low-priority-radio"} className="input-radio  ml-2" name="priority-radio" value="low" checked={newEntry.priority == "low"} required />
                                    <label htmlFor="low-priority-radio" className="border-green-500 text-green-500 low-priority">LOW</label>

                                    <input onChange={handleSelectPriority} type="radio" id="med-priority-radio" className="input-radio" name="priority-radio" value="medium" checked={newEntry.priority == "medium"}  ></input>
                                    <label htmlFor="med-priority-radio" className="border-yellow-500 text-yellow-500  med-priority">MEDIUM</label>

                                    <input onChange={handleSelectPriority} type="radio" id="hi-priority-radio" className="input-radio" name="priority-radio" value="high" checked={newEntry.priority == "high"} ></input>
                                    <label htmlFor="hi-priority-radio" className="border-red-500 text-red-500  hi-priority">HIGH</label>
                                </label>
                            </div>
                        </div>
                        <button onClick={handleSubmit}>submit</button>
                    </form>



                </div>
            </dialog>
        </div>

    )

}
export default AddToDo

