import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const urlDays = "http://localhost:8001/api/days";
    const urlApp = "http://localhost:8001/api/appointments";
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

  // UPDATE SPOTS CODE ALONG DON'T MUTATE STATE
  // null interview === spots available
  // count appointments for day that have an empty interview
  const updateSpots = function (day, days, appointments) {
    //days is an arr, appointments an obj, day is a string like Monday
    // find day object
    const dayObj = days.find((item) => item.name === day);

    // get appointment array
    //iterate appointment array
    const appointmentIDs = dayObj.appointments; //(now we have array of appointments);
    let spots = 0; //let because we will be changing it
    for (const id of appointmentIDs) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    //nothing has changed up to this point and below is where it gets dangerous
    //now we are changing dayObj
    // dayObj.spots = spots;

    const newDayObj = { ...dayObj, spots };
    const newArray = days.map((item) => (item.name === day ? newDayObj : item));
    return newArray;
    // if interview is null result spots++
    // update the spots in the dayObj (which is part of days)
    // make sure to copy the original days so it updates state here
    // const newDays = [...days];
    //now updateSpots returns a completely new days array with an updated day object that doesn't affect original
    // return newDays;
  };

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

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      const days = updateSpots(state.day, state.days, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  //  api call to remove date from DB using axios request
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      let days = updateSpots(state.day, state.days, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  // this is the main export for the useApplication Data
  let resultObj = { state, setDay, bookInterview, cancelInterview };
  return resultObj;
}
