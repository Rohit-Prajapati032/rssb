import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // This will store Cloudinary URL
  const [imageFile, setImageFile] = useState(null); // Temporary file selected by user
  const [description, setDescription] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const addItem = () => {
    if (itemInput.trim() !== "") {
      setItems([...items, itemInput.trim()]);
      setItemInput("");
    }
  };


  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    const cloudName = "dvxn8bgur";
    const UPLOAD_PRESET = "product_upload";
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET); // Replace with your preset

    try {
      
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return res.data.secure_url; // Return Cloudinary URL
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Title and description required");

    setLoading(true);
    try {
      let imageUrl = image; // If user already entered URL manually
      if (imageFile) {
        // Upload to Cloudinary if user selected a file
        const uploadedUrl = await uploadImageToCloudinary();
        if (!uploadedUrl) {
          setLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const newProduct = { title, image: imageUrl, description, items };
      const res = await axios.post(
        "https://backend-rssb.onrender.com/api/product/new",
        newProduct
      );

      // console.log("Product added:", res.data);
      alert("Product added successfully!");
      navigate("/");

      // Reset form
      setTitle("");
      setImage("");
      setImageFile(null);
      setDescription("");
      setItems([]);
      setItemInput("");
    } catch (error) {
      // console.error("Error adding product:", error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <small className="text-muted">
            Or enter an image URL manually below:
          </small>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Add Items</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter item name"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="mb-3">
            <strong>Items:</strong> {items.join(", ")}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
