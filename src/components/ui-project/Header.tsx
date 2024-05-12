import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import useAuth from "@/context/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-slate-700">
      <nav className="container py-1 flex justify-between items-center">
        <ul className="flex gap-3 text-white">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/secure">Secure</NavLink>
          </li>
          <li>
            <NavLink to="/kontakt">Kontakt</NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-2 text-white">
          Welcome, {user?.firstname} {user?.lastname}
          <Logout />
        </div>
      </nav>
    </header>
  );
};

export default Header;
