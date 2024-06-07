import { Link } from "react-router-dom";

const ProjectList = ({
  projects,
  currentProject,
  setProject,
  currentPage,
  setCurrentPage
}) => {
  return projects.map((entry) => {
    return (
      // <div key={entry.id}>{entry.title}</div>
      <Link
        key={entry.id}
        onClick={() => {
          setCurrentPage("projects-to-do");
          setProject(entry.title);
        }}
        to={"/projects-to-do"}
        className={`nav-links ${currentProject == entry.title && currentPage == "projects-to-do" ? "bg-blue-700" : null}`}
      >
        <div>{entry.title}</div>
        <div></div>
      </Link>
    );
  });
};
export default ProjectList;
