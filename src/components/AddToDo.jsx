import { useRef, useState } from "react";
import ToDoList from "../components/ToDoList"
import { useOutletContext } from "react-router-dom";
//mui imports
import SvgIcon from '@mui/material/SvgIcon';
import CloseIcon from '@mui/icons-material/Close';

const AddToDo = () => {
    const [toDoData, notesData] = useOutletContext()
    const [open, setOpen] = useState(false)
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
            dialogRef.current.close()
        }
    }

    return (
        <div>
            <p>add something to do</p>
            <button onClick={handleOpen}>+++++++++</button>
            <dialog
                ref={dialogRef}
                onClick={(handleClickOutside)}
                className=" w-[40vw] h-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" >
                <div className="flex justify-between items-center px-4 py-2 bg-yellow-500">
                    <p className="text-xl font-bold">Add new To Do Entry</p>
                    <SvgIcon className="stroke-[10px]" onClick={handleClose}>{<CloseIcon />}</SvgIcon>
                </div>
                <div>
                    <form action="" className="flex flex-col">
                        <input type="text" placeholder="Title: Clean my wardrobe" required maxLength={50} />
                        <textarea name="details" id="details" cols={30} rows={10} placeholder="Details: fold shirts, iron uniform" required maxLength={400}></textarea>
                        <label htmlFor="input-date">
                            Due date:
                            <input type="date" id="input-date" required />
                        </label>
                        <div>
                            <div>
                                <label htmlFor="input-priority">
                                    Due date:
                                    <input type="radio" id="low-priority-radio" class="input-radio" name="priority-radio" value="low" required="" />
                                    <label for="low-priority-radio" class="low-priority">LOW</label>
                                    <input type="radio" id="med-priority-radio" class="input-radio" name="priority-radio" value="medium"></input>
                                    <label for="med-priority-radio" class="med-priority">MEDIUM</label>
                                    <input type="radio" id="hi-priority-radio" class="input-radio" name="priority-radio" value="high"></input>
                                    <label for="hi-priority-radio" class="hi-priority">HIGH</label>
                                </label>
                            </div>
                        </div>
                        <button>submit</button>
                    </form>



                </div>
            </dialog>
        </div>

    )

}
export default AddToDo

