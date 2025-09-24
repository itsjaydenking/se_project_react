const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

export function addItem({ name, weather, link, imageUrl }) {
  const payload = {
    name: name || "Untitled",
    weather: (weather || "").toLowerCase(),
    imageUrl: imageUrl || link || "",
  };
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => (res.ok ? id : Promise.reject(`Error: ${res.status}`)));
}
