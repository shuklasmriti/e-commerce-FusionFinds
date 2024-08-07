import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Pages/Loader/Loader";
import { useState, useEffect } from "react";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

<link rel="stylesheet" href="./Components/SinglePage/SinglePage.css" />;

export const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, handleAddToWishlist,removeFromWishlist } = useContext(WishlistContext);

  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch(` https://dummyjson.com/products/${id}`);
        const jsonn = await res.json();
        setCategoryData(jsonn);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);
  // console.log(categoryData)
  // console.log(wishlist)
  return (
    <div className="SinglePage">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <div style={{ display: "flex", alignItems: "center" }}> */}
            <div className="image-content">
              <div className="single-image">
                <img src={categoryData?.thumbnail} alt="" />
              </div>
              <div className="cart-content">
                <div>
                  <div className="price">Price:$ {categoryData?.price}</div>
                  <div className="discount">
                    Discount:{categoryData?.discountPercentage}%
                  </div>
                </div>
                <div className="go-to-cart">
                  <button
                    className="cart-btn"
                    onClick={() => {
                      if (cart?.find((item) => item.id === categoryData.id)) {
                        navigate("/cart");
                      } else {
                        addToCart(categoryData);
                      }
                    }}
                  >
                    {cart?.find((item) => item.id === categoryData.id)
                      ? "Go To Cart"
                      : "Add To Cart"}

                    <FaShoppingCart size={17} />
                  </button>
                </div>
                <div className="wishlist-btn">
                  <button
                    className="wishlist-btn"
                    onClick={() => {
                      if (wishlist?.find((item) => item?.id === categoryData?.id)){
                        // navigate("/wishlist");
                        removeFromWishlist(categoryData.id)
                      }else {
                        handleAddToWishlist(categoryData);
                        

                      }
                    }}
                  >
                    {wishlist?.find((item) => item?.id === categoryData?.id)
                      ? "Remove "
                      : "Add to wishlist"}
                    <FaHeart size={17} />
                  </button>
                </div>
              </div>
            </div>
            <div className="description-content">
              <div className="single-title">Name:{categoryData?.title}</div>
              <div className="single-description">
                {categoryData?.description}
              </div>
            </div>
        
        </>
      )}
    </div>
  );
};
