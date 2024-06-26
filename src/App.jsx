import { useEffect, useState } from "react";
import { Outlet, Link, json } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { sampleToDo, sampleNotes } from "./assets/SampleData";
import ToDoList from "./components/ToDoList";
import AddProject from "./components/AddProject";
import ProjectList from "./components/ProjectList";
import { isSameDay, isSameWeek } from "date-fns";
import RecentActions from "./components/RecentActions";
// import { getTime } from "date-fns";

function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [currentProjectPage, setCurrentProjectPage] = useState();
  const [toDoData, setToDoData] = useState(() => {
    const localValue = localStorage.getItem("toDo");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [notesData, setNotesData] = useState(() => {
    const localValue = localStorage.getItem("notes");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [projectsData, setProjectsData] = useState(() => {
    const localValue = localStorage.getItem("projects");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [recentActions, setRecentActions] = useState(() => {
    const localValue = localStorage.getItem("recentActions");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDoData));
    localStorage.setItem("notes", JSON.stringify(notesData));
    localStorage.setItem("projects", JSON.stringify(projectsData));
    localStorage.setItem("recentActions", JSON.stringify(recentActions));
  }, [toDoData, notesData, projectsData, recentActions]);

  const today = new Date().toISOString().slice(0, 10);
  const todayDue = toDoData.filter((entry) => {
    return isSameDay(today, entry.dueDate);
  }).length;
  const weekDue = toDoData.filter((entry) => {
    return isSameWeek(today, entry.dueDate);
  }).length;

  return (
    <div className="h-screen flex flex-col">
      <header>
        <h1 className="text-4xl bg-yellow-500 py-3 pl-8">
          <Link onClick={() => setCurrentPage("/")} to={"/"}>
            Odin Project: To Do List
          </Link>
        </h1>
      </header>
      <section className="flex flex-1">
        <nav className="bg-blue-500 basis-[20%] min-w-[18%]">
          <div className="flex flex-col text-2xl px-4 pt-8 gap-3">
            <div className="border-b pb-3">
              <Link
                onClick={() => setCurrentPage("all-to-do")}
                to={"/all-to-do"}
                className={`nav-links ${currentPage == "all-to-do" ? "bg-blue-700 font-bold" : null}`}
              >
                <div>{`All - `}</div>
                <div className="font-bold">{toDoData.length}</div>
              </Link>
            </div>
            <div className="flex flex-col gap-1 border-b pb-3">
              <Link
                onClick={() => setCurrentPage("today-to-do")}
                to={"/today-to-do"}
                className={`nav-links ${currentPage == "today-to-do" ? "bg-blue-700 font-bold" : null}`}
              >
                <div>{`Today - `}</div>
                <div className="font-bold">{todayDue}</div>
              </Link>
              <div></div>
              <Link
                onClick={() => setCurrentPage("week-to-do")}
                to={"/week-to-do"}
                className={`nav-links ${currentPage == "week-to-do" ? "bg-blue-700 font-bold" : null}`}
              >
                <div>{`Week - `}</div>
                <div className="font-bold">{weekDue}</div>
              </Link>
            </div>
            <div className="border-b pb-3">
              <p className="mb-2">Projects</p>
              <div className="flex flex-col gap-1 ml-5">
                <ProjectList
                  toDoData={toDoData}
                  projects={projectsData}
                  currentProject={currentProjectPage}
                  setProject={setCurrentProjectPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                ></ProjectList>
                <AddProject
                  projectsData={projectsData}
                  setProjectsData={setProjectsData}
                  recentActions={recentActions}
                  setRecentActions={setRecentActions}
                ></AddProject>
              </div>
            </div>
            <div>
              <Link
                onClick={() => setCurrentPage("notes")}
                to={"/notes"}
                className={`nav-links ${currentPage == "notes" ? "bg-blue-700 font-bold" : null}`}
              >
                Notes
              </Link>
            </div>
          </div>
        </nav>
        <main className="bg-orange-100 basis-full ">
          <div className="py-4 px-10 flex gap-10 max-h-[89dvh]">
            <div className="basis-full max-h overflow-x-hidden">
              {currentPage === "/" ? (
                <HomePage />
              ) : (
                <Outlet
                  context={{
                    toDoData: toDoData,
                    setToDoData: setToDoData,
                    currentPage: currentPage,
                    projectsData: projectsData,
                    setProjectsData: setProjectsData,
                    currentProjectPage: currentProjectPage,
                    setCurrentProjectPage: setCurrentProjectPage,
                    recentActions: recentActions,
                    setRecentActions: setRecentActions,
                    notesData: notesData,
                    setNotesData: setNotesData
                  }}
                />
              )}
            </div>
            <div className="basis-1/3  overflow-auto overflow-x-hidden">
              <RecentActions data={recentActions}></RecentActions>
            </div>
          </div>
        </main>
      </section>
      <footer className="bg-red-500">ree</footer>
    </div>
  );
}
export default App;
