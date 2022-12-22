import axios from "axios";
// const BASE_URL = "https://relevel-crm--backend.herokuapp.com"
const BASE_URL = "https://cooperative-fox-bonnet.cyclic.app";

export async function getAllUser(userId) {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/users/${userId}`,
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

export async function updateUserData(userId, selectedCurrUser) {
  return await axios.put(
    `${BASE_URL}/crm/api/v1/users/${userId} `,
    selectedCurrUser,
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
