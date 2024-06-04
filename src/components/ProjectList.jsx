import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
    return (
        projects.map(entry => {
            return (
                // <div key={entry.id}>{entry.title}</div>
                <Link
                    key={entry.id}
                    onClick={() => { console.log(entry.title) }}
                    to={'/projects-to-do'}>
                    {entry.title}
                </Link>
            )
        })
    )


}
export default ProjectList