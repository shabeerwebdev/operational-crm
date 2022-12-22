import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchTicket, ticketCreation, ticketUpdation } from "../api/tickets";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import CreationModal from "../components/CreationModal";
import EditingModal from "../components/EditingModal";
// import { logoutFn } from "../api/auth";

function Customer() {
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

  const [ticketSts, setTicketSts] = useState({
    ticketUpdationModal: false,
    ticketDetails: [], // store list of tickets
    ticketStatusCount: {}, // for widgets
    selectedCurrTicket: {}, // store selected curr ticket
  });

  const [show, setShow] = useState(false);
  const [editingModal, setEditingModal] = useState(false);
  const [message, setMessage] = useState(""); // messages from api to display to the user

  useEffect(() => {
    (async () => {
      fetchTickets();
    })();
  }, []);

  // get all tickets list
  const fetchTickets = () => {
    fetchTicket()
      .then(function(res) {
        setTicketSts((prev) => {
          return {
            ...prev,
            ticketDetails: res.data,
          };
        });
        updateTicketCount(res.data);
      })
      .catch(function(error) {
        console.log(error);
        // setMessage(error.response.data.message);
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

    setTicketSts((prev) => {
      return {
        ...prev,
        ticketStatusCount: Object.assign({}, data),
      };
    });
  };

  // PUT API : 2. Store the data

  const editTicket = (ticketDetail) => {
    const ticket = {
      id: ticketDetail.id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      assignee: ticketDetail.assignee,
      reporter: ticketDetail.reporter,
      priority: ticketDetail.ticketPriority,
      status: ticketDetail.status,
    };

    // console.log(ticketDetail, ticket, "ticket");

    setTicketSts((prev) => {
      return {
        ...prev,
        selectedCurrTicket: ticket,
        ticketUpdationModal: true,
      };
    });

    // setEditingModal(true);
  };

  return (
    <div className="container-fluid p-0">
      <Navbar />
      <p style={{ color: "#4d4d4d" }} className="fs-3 text-center pt-4">
        Take a look at all your tickets below!
      </p>

      <div className="d-flex justify-content-evenly gap-4 text-center m-5">
        <div className="for-widgets row gap-3 justify-content-evenly">
          <Widget
            icon="envelope-open-fill"
            pathColor="primary"
            ticketCount={ticketSts.ticketStatusCount.open}
            title="Open"
          />

          <Widget
            icon="stopwatch-fill"
            pathColor="warning"
            ticketCount={ticketSts.ticketStatusCount.pending}
            title="Progress"
          />

          <Widget
            icon="x-octagon-fill"
            pathColor="success"
            ticketCount={ticketSts.ticketStatusCount.closed}
            title="Closed"
          />

          <Widget
            icon="shield-slash-fill"
            pathColor="danger"
            ticketCount={ticketSts.ticketStatusCount.blocked}
            title="Blocked"
          />
        </div>
      </div>

      <div className="bg-light p-2 mx-5 rounded">
        <p className="text-center m-0">
          Facing any issues?
          <a
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
            className="p-1 rounded"
          >
            Raise a ticket!
          </a>
        </p>
      </div>

      <div className="px-5 pb-5 pt-2">
        <MaterialTable
          onRowClick={(event, rowData) => editTicket(rowData)}
          columns={columns}
          data={ticketSts.ticketDetails}
          title="TICKETS RAISED BY YOU"
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
      <CreationModal
        show={show}
        setShow={setShow}
        fetchTickets={fetchTickets}
      />
      <EditingModal props={{ ticketSts, setTicketSts, fetchTickets }} />
    </div>
  );
}

export default Customer;
