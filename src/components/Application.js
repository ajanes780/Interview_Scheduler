import React from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
// import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

//main function call of Application

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewDay = getInterviewersForDay(state, state.day);

  const myMappedApp = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={interviewDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        // {...app}
      />
    );
  });

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
