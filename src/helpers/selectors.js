export function getAppointmentsForDay(state, day) {
  const found = state.days.find((dayObject) => dayObject.name === day);
  if (found === undefined) {
    let result = [];
    // console.log("undefined result", state.days.name);
    return result;
  }
  const foundMap = found.appointments.map((id) => state.appointments[id]);
  // const timeMap = found.appointments.map((id) => state.appointments[id].time);

  let result = foundMap;

  return result;
}

// export function getInterview(state, interview) {

//  let result = {}

//   if (interview === null) {
//     return null;
//   }

//   let interviewer = interview.interviewer;
//   console.log("interviewer", interviewer);
//   // console.log("interviewr", interviewer);
//   // interviewer = interviewer.toString();
//   console.log("state.int", state.interviewers);
//   for (const key in state.interviewers) {
//     if (key === interviewer) {
//       result =
//       {
//         interviewer: state.interviewers[key],
//         student: interview.student,
//       };
//     }
//   }
// }

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let interviewerId = interview.interviewer;

  const interviewerObj = state.interviewers[interviewerId];

  interview["interviewer"] = interviewerObj;

  console.log(interview);
  return interview;
}

export function getInterviewersForDay(state, day) {
  //   const found = state.days.find((dayObject) => dayObject.name === day);
  //   if (found === undefined) {
  //     let result = [];
  //     return result;
  //   }
  //   const foundMap = found.interviewers.map((id) => state.interviewers[id]);
  //   // const timeMap = found.appointments.map((id) => state.appointments[id].time);
  //   let interviewersArray = [...found.interviewers];
  //   let whoIsMyinterviewer = [...foundMap];
  //   // console.log("this is found.interviews", data2);
  //   // console.log("this is foundMap", foundMap);
  //   console.log("this is who is my interviewer", whoIsMyinterviewer);

  //   return [whoIsMyinterviewer, interviewersArray];
  // }

  const result = [];
  state.days.forEach((oneDay) => {
    if (day === oneDay.name) {
      console.log("here2");
      oneDay.interviewers.forEach((element) => {
        console.log("HERE", element);
        result.push(state.interviewers[element]);
      });
    }
  });
  console.log("result", result);
  return result;
}
