import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(res.data.product);
      } catch (error) {
        console.error("取得產品細節失敗", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="container mt-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        回產品列表
      </button>
      {isLoading ? (
        <div className="row">
          <div className="col-md-6">
            <div
              className="skeleton-shimmer rounded shadow-sm w-100"
              style={{ height: "400px" }}
            ></div>
          </div>
          <div className="col-md-6">
            <div
              className="skeleton-shimmer w-75 mb-3"
              style={{ height: "2.5rem" }}
            ></div>
            <div className="mb-3">
              <div
                className="skeleton-shimmer w-25"
                style={{ height: "1.5rem" }}
              ></div>
            </div>
            <div
              className="skeleton-shimmer w-100 mb-2"
              style={{ height: "1rem" }}
            ></div>
            <div
              className="skeleton-shimmer w-100 mb-2"
              style={{ height: "1rem" }}
            ></div>
            <div
              className="skeleton-shimmer w-50 mb-4"
              style={{ height: "1rem" }}
            ></div>
            <div className="h3 mb-4">
              <div
                className="skeleton-shimmer w-50"
                style={{ height: "2rem" }}
              ></div>
            </div>
            <div
              className="skeleton-shimmer w-50 rounded-pill"
              style={{ height: "3rem" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="img-fluid rounded shadow-sm"
            />
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
      )}
    </div>
  );
};

export default SingleProduct;
