import React from "react";

const ListView = props => {
  const eventList = props.eventList.data;

  return (
    <div>
      <ul>
        {eventList.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
