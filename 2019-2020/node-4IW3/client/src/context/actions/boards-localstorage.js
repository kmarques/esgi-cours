export const fetchBoards = async () => {
  return localStorage.getItem("boards") || [{ id: 1, name: "test" }];
};
