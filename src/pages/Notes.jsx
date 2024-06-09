import { useOutletContext } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import AddNote from "../components/AddNote";

const Notes = () => {
  const context = useOutletContext();
  return (
    <div className="mr-4">
      <div className="grid grid-cols-4 gap-4">
        {context.notesData.map((item) => {
          return <NoteItem key={item.id} item={item}></NoteItem>;
        })}
        <AddNote
          notesData={context.notesData}
          setNotesData={context.setNotesData}
          recentActions={context.recentActions}
          setRecentActions={context.setRecentActions}
        ></AddNote>
      </div>
    </div>
  );
};
export default Notes;
