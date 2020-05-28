export const fetchBoards = () => {
  return fetch("http://localhost:3000/boards").then((res) => res.json());
};
