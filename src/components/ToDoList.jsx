import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SvgIcon, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ToDoList = ({ toDoData, filter }) => {

    return (
        toDoData.map(toDo => {
            return (
                <div className='w-[75%]' key={toDo.id}>
                    <Accordion className='rounded-lg text-xl shadow-sm' >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            slots={{ transition: Fade }}>
                            <div>{toDo.priority}</div>
                            <div>{toDo.title}</div>
                            <div>{toDo.dueDate}</div>
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