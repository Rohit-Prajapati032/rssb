import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProducrtForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState("");

  // Fetch product for initial values
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://backend-rssb.onrender.com/api/product/${id}`);
      const product = res.data.data || res.data;
      setTitle(product.title);
      setImageUrl(product.imageUrl || product.image);
      setDescription(product.description);
      setItems(product.items || []);
    };
    fetchProduct();
  }, [id]);

  const addItem = () => {
    if (itemInput.trim() !== "") {
      setItems([...items, itemInput.trim()]);
      setItemInput("");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`https://backend-rssb.onrender.com/api/product/${id}`, {
      title,
      imageUrl,
      description,
      items,
    });
    alert("Product updated successfully!");
    navigate(`/products/${id}`); // redirect back to product details
  };

  return (
    <div className="container mt-5">
      <h2>Update Product</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Items</label>
          <div className="input-group mb-2">
            <input className="form-control" value={itemInput} onChange={(e) => setItemInput(e.target.value)} />
            <button type="button" className="btn btn-outline-secondary" onClick={addItem}>
              Add Item
            </button>
          </div>
          <div>
            <strong>Current Items:</strong> {items.join(", ")}
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProducrtForm;
