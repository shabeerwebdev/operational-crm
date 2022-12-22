import axios from "axios";

// const BASE_URL = "https://relevel-crm--backend.herokuapp.com";
const BASE_URL = "https://cooperative-fox-bonnet.cyclic.app";

export async function fetchTicket() {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/tickets/`,
    {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken,
      },
    },
    {
      userId: JSON.parse(localStorage.getItem("user")).userId,
    }
  );
}

// POST API :
// asking for data in params : title, description
export async function ticketCreation(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/tickets/`, data, {
    headers: {
      "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
}

// PUT API : passing the id of the ticket and the new updated data

export async function ticketUpdation(id, selectedCurrTicket) {
  return await axios.put(
    `${BASE_URL}/crm/api/v1/tickets/${id}`,
    selectedCurrTicket,
    {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken,
      },
    },
    {
      userId: JSON.parse(localStorage.getItem("user")).userId,
    }
  );
}
