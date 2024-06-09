import { Typography } from "@mui/material";
import Text from "react";
const NoteItem = ({ item }) => {
  return (
    <div className="max-w-80 bg-white shadow-sm rounded-lg p-4">
      <h2 className="text-xl font-bold">{item.title}</h2>
      <div className="flex flex-col justify-between h-52">
        <Typography className="my-4 note-item">{item.details}</Typography>
        <div className="text-[12px] basis-5 flex justify-end">
          created {item.date} @ {item.time}
        </div>
      </div>
    </div>
  );
};
export default NoteItem;
