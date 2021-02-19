import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  // console.log("this is props form DLI", props);
  function formatSpots() {
    return props.spots === 0
      ? `no spots remaining`
      : props.spots === 1
      ? `${props.spots} spot remaining`
      : `${props.spots} spots remaining`;
  }
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
