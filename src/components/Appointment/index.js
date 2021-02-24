import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
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
      // catch error code and display error view
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }

  // Saving appointment and not mutating state with api call
  function deleteAppointment(name, interviewer) {
    const interview = { student: name, interviewer };

    transition(CONFIRM, true);
    transition(DELETING);
    props
      .cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      // catch error code and display error view
      .catch((err) => {
        transition(ERROR_DEL, true);
      });
  }

  // this is how i set up dynamic views in the app for each "mode"
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
      {mode === DELETING && <Status message="Deleting your appointment" />}

      {mode === ERROR_DEL && (
        <Error message="Sorry we could not delete appointment" onClose={back} />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Sorry we could not save appointment." onClose={back} />
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
          interview={props.interview}
          interviewer={props.interview}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}
      {mode === FORM && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
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
