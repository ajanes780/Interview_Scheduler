import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 56,
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },

  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
];
const myMappedApp = appointments.map((app) => {
  return (
    <Appointment
      key={app.id}
      time={app.time}
      interviewer={app.interviewer}
      {...app}
    />
  );
});

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    const url = "http://localhost:8001/api/days";
    axios.get(url).then((response) => {
      setDays(response.data);
      // console.log("this is the res data", response.data);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>

      <section className="schedule">
        {myMappedApp}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
