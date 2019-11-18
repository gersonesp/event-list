import React from "react";

const convertTimestamptoTime = unixTimestamp => {
  // convert to milliseconds and
  // then create a new Date object
  const dateObj = new Date(unixTimestamp * 1000);
  const utcString = dateObj.toUTCString();

  const time = utcString.slice(0, 16);
  return time;
};

const ListView = props => {
  const eventList = props.eventList.data;

  return (
    <div className="ListView">
      <ul>
        {eventList.map(event => (
          <li key={event.id}>
            <div className="divImage">
              <img src={event.featured_image_url} alt={`${event.event_type}`} />
            </div>

            <div className="eventText">
              <div>
                <div className="title">{event.title}</div>
                <div className="details">
                  {event.location ? (
                    <div className="address">{`${event.location.address_lines[0]} ${event.location.locality}, ${event.location.region} ${event.location.postal_code}`}</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {event.timeslots.length > 1 ? (
                <div className="timeslots">
                  {/* if the event has more than one timeslot render this div  */}
                  {`${event.timeslots.length} times from 
                  ${convertTimestamptoTime(event.timeslots[0].start_date)} to 
                  ${convertTimestamptoTime(
                    event.timeslots[event.timeslots.length - 1].start_date
                  )}
                `}
                </div>
              ) : event.timeslots.length === 1 &&
                typeof event.timeslots[0].start_date !== "undefined" ? (
                <div className="timeslots">
                  {/* if the event has only one timeslot then render this div */}
                  {`${convertTimestamptoTime(event.timeslots[0].start_date)}`}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
