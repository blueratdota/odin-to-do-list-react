import { useRef, useState } from "react";
import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";
//mui imports
import SvgIcon from '@mui/material/SvgIcon';
import CloseIcon from '@mui/icons-material/Close';

const AddToDo = () => {
    const [toDoData, notesData] = useOutletContext()

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
            dialogRef.current.close()
        }
    }

    //button submit function
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="flex bg-white shadow-sm rounded-lg text-lg w-[75%] min-h-[48px] px-4 items-center">
            <p onClick={handleOpen} className="w-full" >Add something to do</p>
            <dialog
                ref={dialogRef}
                onClick={handleClickOutside}
                className=" w-[40vw] h-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" >
                <div className="flex justify-between items-center px-4 py-2 bg-yellow-500">
                    <p className="text-xl font-bold">Add new To Do Entry</p>
                    <SvgIcon className="stroke-[10px]" onClick={handleClose}>{<CloseIcon />}</SvgIcon>
                </div>
                <div>
                    <form action="" className="flex flex-col p-4 gap-4" >
                        <input type="text" placeholder="Title: Clean my wardrobe" required maxLength={50} className="text-2xl border-0 outline-none" />

                        <textarea name="details" id="details" cols={30} rows={8} placeholder="Details: fold shirts, iron uniform" required maxLength={400} className="text-xl border-0 outline-none"></textarea>

                        <label htmlFor="input-date" className="text-xl font-bold">
                            Due date:
                            <input className="ml-2 p-1 px-4 rounded-lg border border-yellow-500 outline-yellow-600 text-lg font-thin" type="date" id="input-date" required />
                        </label>

                        <div>
                            <div>
                                <label htmlFor="input-priority" className="text-xl font-bold priority-options">
                                    Priority:
                                    <input type="radio" id="low-priority-radio" className="input-radio radio-label ml-2" name="priority-radio" value="low" required />
                                    <label htmlFor="low-priority-radio" className="border-green-500 text-green-500 low-priority">LOW</label>

                                    <input type="radio" id="med-priority-radio" className="input-radio" name="priority-radio" value="medium"></input>
                                    <label htmlFor="med-priority-radio" className="border-yellow-500 text-yellow-500  med-priority">MEDIUM</label>

                                    <input type="radio" id="hi-priority-radio" className="input-radio" name="priority-radio" value="high"></input>
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

