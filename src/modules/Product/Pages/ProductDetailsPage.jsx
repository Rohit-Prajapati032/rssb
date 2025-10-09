import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Toast Component
const ToastMessage = ({ message, type = "success", show }) => {
  const toastRef = useRef();

  useEffect(() => {
    if (show) {
      const toast = new window.bootstrap.Toast(toastRef.current);
      toast.show();
    }
  }, [show]);

  return (
    <div
      className={`toast align-items-center text-bg-${type} border-0 position-fixed top-0 end-0 m-3`}
      role="alert"
      ref={toastRef}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
        ></button>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    items: [],
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // 🔹 Show toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // 🔹 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://backend-rssb.onrender.com/api/product/${id}`);
        const data = res.data.data || res.data;

        setProduct(data);
        setForm({
          title: data.title || "",
          description: data.description || "",
          image: data.image || data.imageUrl || "",
          items: data.items || [],
        });
      } catch (err) {
        showToast("Error fetching product details!", "danger");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 🔹 Delete product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://backend-rssb.onrender.com/api/product/${id}`);
      showToast("Product deleted successfully!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showToast("Error deleting product!", "danger");
    }
  };

  // 🔹 Update product
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://backend-rssb.onrender.com/api/product/${id}`, form);
      setProduct(res.data.data || form);
      showToast("Product updated successfully!", "success");
      setIsEditing(false);
    } catch (error) {
      showToast("Error updating product!", "danger");
    }
  };

  // 🔹 Handle item change
  const handleItemChange = (index, value) => {
    const newItems = [...form.items];
    newItems[index] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, ""] });
  const removeItem = (index) =>
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found.</p>;
  }

  return (
    <div className="container my-5">
      {/* 🔹 Toast Component */}
      <ToastMessage message={toast.message} type={toast.type} show={toast.show} />

      <div className="card mb-3 shadow-sm">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={product.image || product.imageUrl}
              className="img-fluid rounded-start"
              alt={product.title}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">
              {!isEditing ? (
                <>
                  <h2 className="card-title">{product.title}</h2>
                  <p className="card-text">{product.description}</p>

                  {product.items && product.items.length > 0 && (
                    <>
                      <h5>Items:</h5>
                      <ul>
                        {product.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-4 d-flex gap-2">
                    <button
                      className="btn btn-warning"
                      onClick={() => setIsEditing(true)}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                // 🔹 Update Form Section
                <form onSubmit={handleSaveChanges}>
                  <h4>Edit Product Details</h4>

                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      required
                    />
                    {form.image && (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="img-thumbnail mt-2"
                        style={{ width: "150px" }}
                      />
                    )}
                  </div>

                  {/* 🔹 Editable Items Section */}
                  <div className="mb-3">
                    <label className="form-label">Items</label>
                    {form.items.map((item, idx) => (
                      <div key={idx} className="d-flex gap-2 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={item}
                          onChange={(e) => handleItemChange(idx, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeItem(idx)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={addItem}
                    >
                      + Add Item
                    </button>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-success">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
