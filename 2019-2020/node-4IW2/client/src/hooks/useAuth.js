import { useContext } from "react";
import BoardContext from "../contexts/boardContext";
import { login } from "../contexts/actions/auth";

const useAuth = () => {
  const {
    state: { auth: authState },
    dispatch,
  } = useContext(BoardContext);

  const actions = {
    login: (data) => {
      login(data).then((data) =>
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
          },
          audiance: "auth",
        })
      );
    },
  };

  const selectors = {
    isLogged: () => !!authState.token,
  };
  return { selectors, actions };
};

export default useAuth;
