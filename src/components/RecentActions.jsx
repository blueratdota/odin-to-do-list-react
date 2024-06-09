const RecentActions = ({ data }) => {
  return (
    <div className="flex flex-col-reverse gap-2">
      {data.map((entry) => {
        // console.log(entry);
        return (
          <div
            key={entry.id}
            className="bg-white min-h-16 max-w-80 p-2 rounded-md shadow-sm"
          >
            {`${entry.action} `}
            <span className="font-bold">{entry.text}</span> on {entry.date} @
            {entry.time}
          </div>
        );
      })}
    </div>
  );
};
export default RecentActions;
