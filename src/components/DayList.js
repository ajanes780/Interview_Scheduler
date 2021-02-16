import React from "react";
import classnames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const mapDays = props.days.map((day, index) => {
    return (
      <DayListItem
        key={index}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={day.setDay}
      />
    );
  });
  return <ul>{mapDays}</ul>;
}
