const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 3],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Adam Sandler",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tom Hanks",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Ross William Ulbricht i ",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
  },
};

function getInterviewersForDay(state, day) {
  const found = state.days.find((dayObject) => dayObject.name === day);
  if (found === undefined) {
    let result = [];
    return result;
  }
  const foundMap = found.appointments.map((id) => state.appointments[id]);
  // const timeMap = found.appointments.map((id) => state.appointments[id].time) // i may use this;

  let result = foundMap;

  return result;
}

// getInterviewersForDay(sta);
