export const addList = async (list) => {
  const key = "lists-" + list.boardId;
  const oldLists = JSON.parse(localStorage.getItem(key)) || [];
  localStorage.setItem(key, JSON.stringify([...oldLists, list]));
  return list;
};

export const fetchLists = async (board) => {
  const key = "lists-" + board.id;
  return JSON.parse(localStorage.getItem(key)) || [];
};
