export const login = (param) =>
  fetch(`http://localhost:3003/login`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: { "Content-type": "application/json" },
  }).then((res) => res.json());
