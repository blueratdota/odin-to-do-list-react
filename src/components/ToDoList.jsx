import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SvgIcon, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isSameDay, isSameWeek } from 'date-fns';


const ToDoList = ({ toDoData, currentPage }) => {
    console.log(currentPage);

    const today = new Date().toISOString().slice(0, 10)
    const completeToDoList = toDoData

    let filteredToDo = []

    if (currentPage == 'all-to-do') {
        filteredToDo = toDoData
    }
    if (currentPage == 'today-to-do') {
        filteredToDo = completeToDoList.filter((entry) => {
            return isSameDay(today, entry.dueDate)
        })
    }
    if (currentPage == 'week-to-do') {
        console.log('WEEK to do');
        filteredToDo = completeToDoList.filter((entry) => {
            return isSameWeek(today, entry.dueDate)
        })
    }


    return (
        filteredToDo.map(toDo => {
            return (
                <div className='w-[75%]' key={toDo.id}>
                    <Accordion className='rounded-lg text-xl shadow-sm' >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            slots={{ transition: Fade }}>
                            <div>{toDo.priority}</div>
                            <div>{toDo.title}</div>
                            <div>{toDo.dueDate}</div>
                            <div>{`${toDo.inProject}`}</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>{toDo.details}</div>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </AccordionActions>
                    </Accordion>
                </div>
            )
        })
    )


}

export default ToDoList