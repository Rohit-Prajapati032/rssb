import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Important for Toast

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `https://backend-rssb.onrender.com/api/v1/users/register`,
        { name, email, password }
      );

      if (res.data.message) {
        // ✅ Show Success Toast
        const toastElement = document.getElementById("successToast");
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // ✅ Redirect after short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server Error";
      setError(errorMessage);

      // ✅ Show Error Toast
      const toastElement = document.getElementById("errorToast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-primary text-decoration-none"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>

      {/* ✅ Success Toast */}
      <div
        className="toast position-fixed bottom-0 end-0 p-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="successToast"
        data-bs-delay="2000"
      >
        <div className="toast-header">
          <strong className="me-auto text-success">Success</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Registered Successfully!</div>
      </div>

      {/* ✅ Error Toast */}
      <div
        className="toast position-fixed bottom-0 end-0 p-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="errorToast"
        data-bs-delay="3000"
      >
        <div className="toast-header bg-danger text-white">
          <strong className="me-auto">Error</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{error || "Something went wrong!"}</div>
      </div>
    </div>
  );
};

export default Register;
