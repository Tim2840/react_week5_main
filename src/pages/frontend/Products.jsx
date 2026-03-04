import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        setProducts(res.data.products);
      } catch (error) {
        console.error("取得產品列表失敗", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">產品列表</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {isLoading
          ? // 顯示 6 個高品質 Shimmer 卡片
            Array.from({ length: 6 }).map((_, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow-sm border-0">
                  <div
                    className="skeleton-shimmer card-img-top"
                    style={{ height: "200px" }}
                  ></div>
                  <div className="card-body">
                    <div
                      className="skeleton-shimmer w-75 mb-3"
                      style={{ height: "1.25rem" }}
                    ></div>
                    <div
                      className="skeleton-shimmer w-100 mb-1"
                      style={{ height: "1rem" }}
                    ></div>
                    <div
                      className="skeleton-shimmer w-50 mb-3"
                      style={{ height: "1rem" }}
                    ></div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="skeleton-shimmer w-25"
                        style={{ height: "1.5rem" }}
                      ></div>
                      <div
                        className="skeleton-shimmer w-25 rounded-pill"
                        style={{ height: "2rem" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={product.imageUrl}
                    className="card-img-top object-fit-cover"
                    style={{ height: "200px" }}
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">
                      {product.title}
                    </h5>
                    <p
                      className="card-text text-muted mb-3 text-truncate-2"
                      style={{ height: "3em" }}
                    >
                      {product.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary mb-0">
                        NT$ {product.price}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-primary btn-sm rounded-pill px-3"
                      >
                        查看細節
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
