import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("取得產品細節失敗", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        回產品列表
      </button>
      <div className="row">
        <div className="col-md-6">
          <img src={product.imageUrl} alt={product.title} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <span className="badge bg-primary mb-3">{product.category}</span>
          <p className="text-muted mb-4">{product.content}</p>
          <div className="h3 text-primary mb-4">NT$ {product.price}</div>
          <button className="btn btn-primary btn-lg rounded-pill px-5">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
