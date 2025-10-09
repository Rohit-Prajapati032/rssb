import React from "react";

const ProductCard = ({ product }) => {
  //  console.log(product.image);
  return (
    <div className="card mb-4 shadow-sm" style={{ width: "17rem" }}>
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
      </div>
    </div>
  );
};

export default ProductCard;
