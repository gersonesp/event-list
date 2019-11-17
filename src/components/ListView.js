import React from "react";

const ListView = props => {
  const eventList = props.eventList.data;

  console.log(eventList);
  return (
    <div className="ListView">
      <ul>
        {eventList.map(event => (
          <li key={event.id}>
            <div className="divImage">
              <img src={event.featured_image_url} alt={`${event.event_type}`} />
            </div>

            <div className="eventText">
              <div className="title">{event.title}</div>
              <div className="details">
                {event.location ? (
                  <div className="address">{`${event.location.address_lines[0]} ${event.location.locality}, ${event.location.region} ${event.location.postal_code}`}</div>
                ) : (
                  ""
                )}
              </div>

              {event.timeslots.length > 1 ? (
                <div className="timeslots">
                  {`${event.timeslots.length} times from 
                  ${new Date(event.timeslots[0].start_date)} to 
                  ${new Date(
                    event.timeslots[event.timeslots.length - 1].start_date
                  )}
                `}
                </div>
              ) : event.timeslots[0].start_date !== "undefined" ? (
                new Date(event.timeslots[0].start_date)
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
