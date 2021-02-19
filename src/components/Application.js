import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const myMappedApp = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        time={app.time}
        interviewer={app.interviewer}
        interview={interview}
        {...app}
      />
    );
  });

  useEffect(() => {
    const urldays = "http://localhost:8001/api/days";
    const urlApp = " http://localhost:8001/api/appointments";
    const urlInv = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(urldays),
      axios.get(urlApp),
      axios.get(urlInv),
    ]).then((all) => {
      console.log("this is all", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  console.log("this is state.interviers", state.interviewers);
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
