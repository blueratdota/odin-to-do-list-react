import { useRef, useState } from "react";

import { isSameDay, isSameWeek } from "date-fns";

import ToDoItem from "./ToDoItem";

const ToDoList = ({
  toDoData,
  currentPage,
  currentProject,
  setToDoData,
  recentActions,
  setRecentActions
}) => {
  // console.log(`current page = ${currentPage}`);

  const today = new Date().toISOString().slice(0, 10);
  const completeToDoList = toDoData;
  // console.log(currentPage);
  // console.log(currentProject);

  let filteredToDo = [];

  if (currentPage == "all-to-do") {
    filteredToDo = toDoData;
  }
  if (currentPage == "today-to-do") {
    filteredToDo = completeToDoList.filter((entry) => {
      return isSameDay(today, entry.dueDate);
    });
  }
  if (currentPage == "week-to-do") {
    console.log("WEEK to do");
    filteredToDo = completeToDoList.filter((entry) => {
      return isSameWeek(today, entry.dueDate);
    });
  }
  if (currentPage == "projects-to-do") {
    // console.log("projects to do");
    filteredToDo = completeToDoList.filter((entry) => {
      return entry.projectName == currentProject;
    });
  }

  return filteredToDo.map((toDo) => {
    return (
      <ToDoItem
        toDo={toDo}
        toDoData={toDoData}
        setToDoData={setToDoData}
        key={toDo.id}
        recentActions={recentActions}
        setRecentActions={setRecentActions}
      ></ToDoItem>
    );
  });
};

export default ToDoList;
