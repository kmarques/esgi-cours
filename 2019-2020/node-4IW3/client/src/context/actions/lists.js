export const addList = (list) =>
  fetch(`http://localhost:3000/lists`, {
    method: "POST",
    body: JSON.stringify(list),
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  }).then((res) => res.json());

export const fetchLists = (board) =>
  fetch(`http://localhost:3000/boards/${board.id}/lists`).then((res) =>
    res.json()
  );
