import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);

  return (
    <ul>
      <li>
        <NavLink to="/login" activeStyle={{ color: "green" }}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/boards" activeStyle={{ color: "green" }}>
          Boards
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" activeStyle={{ color: "green" }}>
          Cart
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
