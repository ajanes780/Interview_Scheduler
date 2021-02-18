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

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let interviewer = interview.interviewer;
  interviewer = interviewer.toString();

  for (const key in state.interviewers) {
    if (key === interviewer) {
      return {
        interviewer: state.interviewers[key],
        student: interview.student,
      };
    }
  }
}
