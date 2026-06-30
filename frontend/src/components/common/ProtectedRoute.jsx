import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const {
    isAuthenticated,
    user,
  } = useSelector(
    (state) => state.auth
  );

  console.log("Is Auth:", isAuthenticated);
  console.log("User:", user);
  console.log("Roles:", user?.roles);
  console.log("Role:", user?.role);

  /* ==========================
       User Not Logged In
  ========================== */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* ==========================
       Admin Route Protection
  ========================== */

  if (
    adminOnly &&
    !user?.roles?.includes("Admin")
  ) {
    console.log(
      "Admin access denied"
    );

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;