export const fetchBoards = async () =>
  JSON.parse(localStorage.getItem("boards")) || [{ id: 1, name: "Test" }];
