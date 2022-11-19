import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 *  Protected route component that checks if the currentUser state is null and displays accordingly 
 * @returns Navlink to login if null, Outlet otherwise
 */
const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return (
      <div className="unauthorized text-center">
        <h1>Unauthorized...</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
