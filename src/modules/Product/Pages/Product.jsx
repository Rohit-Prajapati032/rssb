import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; 
import { getproductData } from "../../../shared/services/product-api";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/product-services";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    try {
      const response = await getProducts();
      // console.log("Fetched products:", response);
      setProducts(response || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className=" container min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Our Products
      </h2>

      {products.length > 0 ? (
        <div className="d-flex flex-wrap gap-5 justify-content-center align-items-center mt-5">
          {products.map((product) => (
            <div key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default Products;
