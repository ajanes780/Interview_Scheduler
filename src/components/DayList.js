import React from "react";
// import classnames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  // console.log("this is my new props DL", props);
  const mapDays = props.days.map((day) => {
    return (
      <DayListItem
        id={day.id}
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{mapDays}</ul>;
}
