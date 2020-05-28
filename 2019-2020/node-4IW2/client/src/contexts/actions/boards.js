export const fetchBoards = () =>
  fetch("http://localhost:3001/boards").then((res) => res.json());
