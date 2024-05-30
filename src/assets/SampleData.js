import { v4 as uuidv4 } from 'uuid';

const SampleData = [
    {
        "toDo": [
            {
                "id": uuidv4(),
                "title": "to do title one",
                "details": "to do details one",
                "dueDate": "to do due date one",
                "priority": "to do priority one",
                "inProject": true,
                "projectName": "Project 1"
            },
            {
                "id": uuidv4(),
                "title": "to do title two",
                "details": "to do details two",
                "dueDate": "to do due date two",
                "priority": "to do priority two",
                "inProject": true,
                "projectName": "Project 2"
            },
            {
                "id": uuidv4(),
                "title": "to do title three",
                "details": "to do details three",
                "dueDate": "to do due date three",
                "priority": "to do priority three",
                "inProject": false,
                "projectName": null
            }
        ],

        "notes": [
            {
                "title": "notes sample 1",
                "details": "notes sample details 1",
            },
            {
                "title": "notes sample 2",
                "details": "notes sample details 2",
            }
        ]
    }
]


const sampleToDo = [
    {
        "id": uuidv4(),
        "title": "to do title one",
        "details": "to do details one",
        "dueDate": "to do due date one",
        "priority": "to do priority one",
        "inProject": true,
        "projectName": "Project 1",
        "isDone": false
    },
    {
        "id": uuidv4(),
        "title": "to do title two",
        "details": "to do details two",
        "dueDate": "to do due date two",
        "priority": "to do priority two",
        "inProject": true,
        "projectName": "Project 2",
        "isDone": false
    },
    {
        "id": uuidv4(),
        "title": "to do title three",
        "details": "to do details three",
        "dueDate": "to do due date three",
        "priority": "to do priority three",
        "inProject": false,
        "projectName": null,
        "isDone": false
    }
]

const sampleNotes = [
    {
        "title": "notes sample 1",
        "details": "notes sample details 1",
    },
    {
        "title": "notes sample 2",
        "details": "notes sample details 2",
    }
]




export { sampleToDo, sampleNotes }