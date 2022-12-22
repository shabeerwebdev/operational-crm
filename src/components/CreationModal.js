import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchTicket, ticketCreation, ticketUpdation } from "../api/tickets";

function Modals({ show, setShow, fetchTickets }) {
  const [message, setMessage] = useState({
    success: "",
    failure: "",
  }); // messages from api to display to the user

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createTicket = (e) => {
    e.preventDefault();
    ticketCreation(data)
      .then(function(response) {
        // setShow(false);
        setMessage({ success: "Ticket Created Successfully!" });
        setData({ title: "", description: "" });
        setTimeout(() => {
          setMessage({ success: "" });
        }, 1800);
        // setTicketSts({ createTicketModal: false });
        fetchTickets();
      })
      .catch(function(error) {
        setMessage({ failure: error.response.data.message });
        console.log(error, "err");
      });
  };

  return (
    <div>
      <Modal
        className={`${message.failure && "shake"} ${message.success &&
          "pulse"}`}
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={() => {
          setMessage({ success: "", failure: "" }); //so that on next modal instance the error msg is hidden
          setShow(false);
        }}
        centered
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="mx-3">
            <h5
              className={`${message.success ? "text-success" : "text-danger"}`}
            >
              {message.success || message.failure}
            </h5>
          </div>
          <form className="modal-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                value={data.title}
                onChange={onChange}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                name="description"
                value={data.description}
                onChange={onChange}
                id="description"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="description">DESCRIPTION</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            aria-labelledby="contained-modal-title-vcenter"
            variant="secondary"
            onClick={() => setShow((prev) => !prev)}
          >
            Close
          </Button>
          <Button onClick={createTicket} variant="primary">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Modals;
