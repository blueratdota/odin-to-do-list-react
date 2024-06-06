import { Link } from "react-router-dom";

const ProjectList = ({ projects, setProject, setCurrentPage }) => {
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
      >
        {entry.title}
      </Link>
    );
  });
};
export default ProjectList;
