import React from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { selectors, actions } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    actions.login({ ...data });
  };

  return (
    <>
      <span>{selectors.isLogged() ? "Connected" : "Not connected"}</span>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Valider</button>
      </form>
    </>
  );
};

export default Login;
