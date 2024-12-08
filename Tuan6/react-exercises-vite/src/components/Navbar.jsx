import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 text-white bg-xanh-than">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-xl font-bold">React Exercises</h1>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/counter"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Counter
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Task List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/input"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Input Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/toggle"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Toggle Text
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
