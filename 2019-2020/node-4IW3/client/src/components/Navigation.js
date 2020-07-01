import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ location }) => {
  return (
    <ul>
      <li>
        <NavLink to="/boards" activeStyle={{ color: "green" }}>
          Boards
        </NavLink>
      </li>
      <li>
        <NavLink to="/boards/1" activeStyle={{ color: "green" }}>
          Boards 1
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeStyle={{ color: "green" }}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/create-order" activeStyle={{ color: "green" }}>
          CreateOrder
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
