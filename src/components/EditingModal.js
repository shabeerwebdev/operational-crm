import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchTicket, ticketCreation, ticketUpdation } from "../api/tickets";

function EditingModal({ props }) {
  useEffect(() => {
    (async () => {
      props.fetchTickets();
    })();
  }, []);

  const [message, setMessage] = useState({
    success: "",
    failure: "",
  }); // messages from api to display to the user

  const onChange = (e) => {
    props.setTicketSts((prev) => {
      return {
        ...prev,
        selectedCurrTicket: {
          ...prev.selectedCurrTicket,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(
      props.ticketSts.selectedCurrTicket.id,
      props.ticketSts.selectedCurrTicket
    )
      .then(function(response) {
        console.log(" Ticket Updated successfully!");
        hideModal();
        props.fetchTickets();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const updateSts = () => {
    props.setTicketSts((prev) => {
      return {
        ...prev,
        ticketUpdationModal: false,
      };
    });
  };

  const hideModal = () => {
    props.setTicketSts((prev) => {
      return {
        ...prev,
        ticketUpdationModal: false,
      };
    });
  };

  return (
    <div>
      <Modal
        centered
        show={props.ticketSts.ticketUpdationModal}
        onHide={hideModal}
      >
        <Modal.Header closeButton>Update the Ticket</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={updateTicket}
            className="d-flex flex-column p-2 gap-3"
          >
            <h5 className="text-success">
              ID : {props.ticketSts.selectedCurrTicket.id}
            </h5>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="title"
                value={props.ticketSts.selectedCurrTicket.title}
                readOnly
              />
              <label>TITLE</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="assignee"
                value={props.ticketSts.selectedCurrTicket.assignee}
                readOnly
              />
              <label>Assignee</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="priority"
                value={props.ticketSts.selectedCurrTicket.priority}
                readOnly
              />
              <label>Priority</label>
            </div>

            <div className="form-floating">
              <textarea
                style={{ height: "100px" }}
                id="description"
                className="form-control"
                rows="7"
                name="description"
                value={props.ticketSts.selectedCurrTicket.description}
                onChange={onChange}
              />
              <label htmlFor="description">DESCRIPTION</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select"
                name="status"
                value={props.ticketSts.selectedCurrTicket.status}
                onChange={onChange}
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
              <label>STATUS</label>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" className="" onClick={updateSts}>
                Cancel
              </Button>
              <Button className="" type="submit" variant="success">
                Update
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default EditingModal;
