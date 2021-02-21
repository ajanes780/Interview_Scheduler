import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Confirm";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const EDIT = "EDIT";
const FORM = "FORM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_DEL = "ERROR_DEL";
const ERROR_SAVE = "ERROR_SAVE";

// these are the main functions the appointment can complete
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saving and appointment and not mutating state with api call
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE);
      });
  }

  // Saving appointment and not mutating state with api call
  function deleteAppointment(name, interviewer) {
    const interview = { student: name, interviewer };

    transition(CONFIRM);
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DEL);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
      {mode === DELETING && <Status message="Deleting your appointment" />}

      {mode === ERROR_DEL && (
        <Error
          message="Could not delete appointment"
          onClose={() => transition(CONFIRM)}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={() => {
            transition(EDIT);
          }}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={deleteAppointment}
          onCancel={() => {
            transition(SHOW);
          }}
        />
      )}

      {mode === SHOW && (
        <Show
          onEdit={() => transition(EDIT)}
          student={props.interview.student}
          interview={props.interview} //PUTTING A NOTE HERE THIS IS DIFFERENT
          interviewer={props.interview}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}
      {mode === FORM && (
        <Form
          // name={props.interview.student}
          interviewers={props.interviewers}
          // interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
    </article>
  );
}
