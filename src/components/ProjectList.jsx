import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIcon } from "@mui/material";

const ProjectList = ({
  toDoData,
  projects,
  currentProject,
  setProject,
  currentPage,
  setCurrentPage
}) => {
  return projects.map((entry) => {
    let projectEntries = 0;
    for (const x of toDoData) {
      if (x.projectName == entry.title) {
        projectEntries++;
      }
    }
    return (
      <Link
        key={entry.id}
        onClick={() => {
          setCurrentPage("projects-to-do");
          setProject(entry.title);
        }}
        to={"/projects-to-do"}
        className={`nav-links ${currentProject == entry.title && currentPage == "projects-to-do" ? "bg-blue-700 font-bold" : null}`}
      >
        <div className="flex items-center">
          <SvgIcon className="text-3xl">
            <ArrowRightIcon />
          </SvgIcon>

          <div>
            {entry.title} - <span className="font-bold">{projectEntries}</span>
          </div>
        </div>
      </Link>
    );
  });
};
export default ProjectList;
