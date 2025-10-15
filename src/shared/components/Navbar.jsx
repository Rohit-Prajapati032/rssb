import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  // ✅ Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(!!token);
  }, []);

  // ✅ Listen for login/logout changes (from anywhere in app)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setUser(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    window.dispatchEvent(new Event("storage")); // trigger navbar update
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          RSSB
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addProduct">
                Add Product
              </Link>
            </li>

            {/* ✅ Login / Logout Button */}
            <li className="nav-item ms-3">
              {user ? (
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
