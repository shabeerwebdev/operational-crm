import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchTicket, ticketUpdation } from "../api/tickets";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import { Modal, Button } from "react-bootstrap";

function Engineer() {
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "TITLE",
      field: "title",
    },
    {
      title: "REPORTER",
      field: "reporter",
    },
    {
      title: "DESCRIPTION",
      field: "description",
    },
    {
      title: "PRIORITY",
      field: "ticketPriority",
    },
    {
      title: "STATUS",
      field: "status",
      lookup: {
        OPEN: "OPEN",
        IN_PROGRESS: "IN_PROGRESS",
        CLOSED: "CLOSED",
        BLOCKED: "BLOCKED",
      },
    },
  ];
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  // store list of tickets
  const [ticketDetails, setTicketDetails] = useState([]);
  // for widgets
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  // messages from api to display to the user
  const [message, setMessage] = useState("");
  // store selected curr ticket
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  // store the selected curr ticket updated / new data
  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);
  // close modal
  const closeTicketUpdationModal = () => setTicketUpdationModal(false);

  useEffect(() => {
    (async () => {
      fetchTickets();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get all tickets list
  const fetchTickets = () => {
    fetchTicket()
      .then(function(res) {
        setTicketDetails(res.data);
        updateTicketCount(res.data);
      })
      .catch(function(error) {
        setMessage(error.response.data.message);
      });
  };
  // update widgets
  const updateTicketCount = (tickets) => {
    const data = {
      open: 0,
      pending: 0,
      closed: 0,
      blocked: 0,
    };
    tickets.forEach((ticket) => {
      if (ticket.status === "OPEN") data.open += 1;
      else if (ticket.status === "IN_PROGRESS") data.pending += 1;
      else if (ticket.status === "CLOSED") data.closed += 1;
      else if (ticket.status === "BLOCKED") data.blocked += 1;
    });

    console.log(data, 'here');

    setTicketStatusCount(Object.assign({}, data));
  };

  // store the curr ticket details
  const editTicket = (ticketDetail) => {
    // console.log(ticketDetail);

    const ticket = {
      id: ticketDetail.id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      priority: ticketDetail.ticketPriority,
      reporter: ticketDetail.reporter,
      assignee: ticketDetail.assignee,
      status: ticketDetail.status,
    };
    setSelectedCurrTicket(ticket);
    setTicketUpdationModal(true);
  };

  // grab the updated/ new data & store in a state
  const onTicketUpdate = (e) => {
    if (e.target.name === "priority")
      selectedCurrTicket.priority = e.target.value;
    else if (e.target.name === "description")
      selectedCurrTicket.description = e.target.value;
    else if (e.target.name === "status")
      selectedCurrTicket.status = e.target.value;

    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };
  // fetch put  api with updated details
  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function(res) {
        setMessage("Ticket Updated Successfully!");
        fetchTickets();
        closeTicketUpdationModal();
      })
      .catch(function(error) {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="container-fluid p-0">
      <Navbar />
      <p style={{ color: "#4d4d4d" }} className="fs-3 text-center pt-4">
        Take a quick look at your engineer stats below!
      </p>

      <div className="d-flex justify-content-evenly gap-4 text-center m-5">
        <div className="for-widgets row gap-3 justify-content-evenly">
          <Widget
            icon="envelope-open-fill"
            pathColor="primary"
            ticketCount={ticketStatusCount.open}
            title="Open"
          />
          <Widget
            icon="stopwatch-fill"
            pathColor="warning"
            ticketCount={ticketStatusCount.pending}
            title="Progress"
          />
          <Widget
            icon="x-octagon-fill"
            pathColor="success"
            ticketCount={ticketStatusCount.closed}
            title="Closed"
          />
          <Widget
            icon="shield-slash-fill"
            pathColor="danger"
            ticketCount={ticketStatusCount.blocked}
            title="Blocked"
          />
        </div>
      </div>
      <div className="px-5 pb-5 pt-2">
        <MaterialTable
          onRowClick={(event, rowData) => editTicket(rowData)}
          columns={columns}
          data={ticketDetails}
          title="TICKET ASSIGNED TO YOU"
          options={{
            filtering: true,
            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "Ticket Records"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "Ticket Records"),
              },
            ],
            headerStyle: {
              // backgroundColor: "darkblue",
              // color: "#fff",
            },
            rowStyle: {
              // backgroundColor: "#c8dcfc",
            },
          }}
        />
      </div>
      {ticketUpdationModal ? (
        <Modal
          show={ticketUpdationModal}
          onHide={() => setTicketUpdationModal(false)}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>UPDATE TICKET</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={updateTicket}>
              <div className="p-1">
                <h5 className="text-primary"> ID: {selectedCurrTicket.id} </h5>
              </div>
              <div className="input-group m-1">
                <label className="label label-md input-group-text">TITLE</label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  value={selectedCurrTicket.title}
                />
              </div>
              <div className="input-group m-1">
                <label className="label label-md input-group-text">
                  REPORTER
                </label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  value={selectedCurrTicket.reporter}
                />
              </div>
              <div className="input-group m-1">
                <label className="label label-md input-group-text">
                  PRIORITY
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="priority"
                  value={selectedCurrTicket.priority}
                  onChange={onTicketUpdate}
                />
              </div>

              <div className="input-group m-1">
                <label className="label label-md input-group-text">
                  STATUS
                </label>
                <select
                  className="form-select"
                  value={selectedCurrTicket.status}
                  onChange={onTicketUpdate}
                  name="status"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>
              <div className="input-group m-1">
                <label className="label label-md input-group-text">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  onChange={onTicketUpdate}
                  name="description"
                  className="form-control"
                  value={selectedCurrTicket.description}
                />
              </div>

              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="m-1"
                  onClick={() => closeTicketUpdationModal()}
                >
                  Cancel
                </Button>
                <Button variant="primary" className="m-1" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
}

export default Engineer;
