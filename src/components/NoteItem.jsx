import { Typography, SvgIcon, Popover } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
const NoteItem = ({
  item,
  index,
  notesData,
  setNotesData,
  recentActions,
  setRecentActions
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleDelete() {
    setRecentActions([
      ...recentActions,
      {
        id: uuidv4(),
        text: `${item.title}`,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        action: "Deleted"
      }
    ]);
    setNotesData(notesData.filter((a) => a.id !== item.id));
  }
  return (
    <div className={`max-w-80 bg-white shadow-sm rounded-lg p-4`}>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold truncate mr-4">{item.title}</h2>
          <SvgIcon
            className=" hover:bg-gray-400 hover:cursor-pointer rounded-3xl p-1"
            onClick={handleDelete}
          >
            {<CloseIcon />}
          </SvgIcon>
        </div>
        <div
          onClick={handleClick}
          className="flex flex-col justify-between h-48 hover:cursor-pointer"
        >
          <Typography className="mt-4 note-item">{item.details}</Typography>
          <div className="text-[12px] flex justify-end">
            created {item.date} @ {item.time}
          </div>
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
      >
        <Typography sx={{ p: 2, maxWidth: 400 }} onClick={handleClose}>
          {item.details}
        </Typography>
      </Popover>
    </div>
  );
};
export default NoteItem;
