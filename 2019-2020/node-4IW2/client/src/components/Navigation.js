import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ location }) => {
  return !location.state || location.state.displayNav !== false ? (
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
  ) : (
    <></>
  );
};

/**
 * {pathname: "/login", search: "", hash: "", state: {…}, key: "5ldp3r"}
hash: ""
key: "5ldp3r"
pathname: "/login"
search: ""
state: {
   displayNav: false
}
__proto__: Object
__proto__: Object
 */

export default Navigation;
