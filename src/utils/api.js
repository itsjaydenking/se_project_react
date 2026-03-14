const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.royalcloset.serverpit.com"
    : "http://localhost:3001";

export function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Public (no token)
export function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

export function addItem({ name, weather, link, imageUrl }, token) {
  const payload = {
    name: name || "Untitled",
    weather: (weather || "").toLowerCase(),
    imageUrl: imageUrl || link || "",
  };

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

export function updateUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
}

export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  }).then(handleResponse);
}

export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(handleResponse);
}
