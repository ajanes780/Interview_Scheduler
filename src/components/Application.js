import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

//main function call of Application

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewDay = getInterviewersForDay(state, state.day);

  // create and save an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // api call using axios to DB to update Appointment information
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  //  api call to remove date from DB using axios request
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, {
        id: appointment.id,
        time: appointment.time,
        interview: null,
      })
      .then((res) => {
        console.log("WHAT BE HERE ");
        setState({ ...state, appointments });
      });
    // .catch((err) => {
    //   console.log("error", err);
    // });
  }

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

  useEffect(() => {
    const urlDays = "http://localhost:8001/api/days";
    const urlApp = " http://localhost:8001/api/appointments";
    const urlInv = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(urlDays),
      axios.get(urlApp),
      axios.get(urlInv),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
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
