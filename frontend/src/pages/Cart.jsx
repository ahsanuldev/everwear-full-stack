import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../utils/Title";
import { RiDeleteBin7Line } from "@remixicon/react";
import CartTotal from "../components/CartTotal";

import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const hasColor = item.includes("_");
            tempData.push({
              _id: items,
              itemKey: item,
              size: hasColor ? item.split("_")[0] : item,
              color: hasColor ? item.split("_")[1] : "",
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 section-padding">
      <div className="text-2xl mb-3 ">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <p>
                      {currency} {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 py-1 border bg-slate-50 text-xs sm:text-sm font-medium">
                      Size: {item.size}
                    </p>
                    {item.color && (
                      <p className="px-2 sm:px-3 py-1 border bg-slate-50 text-xs sm:text-sm font-medium">
                        Color: {item.color}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.itemKey,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                max={8}
                defaultValue={item.quantity}
              />
              <RiDeleteBin7Line
                onClick={() => updateQuantity(item._id, item.itemKey, 0)}
                className="size-5 text-gray-600 mr-4 cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                if (!token) {
                  toast.error("Please login to proceed to checkout.");
                  navigate("/login");
                } else {
                  navigate("/place-order");
                }
              }}
              className="bg-black text-white text-sm my-8 px-8 py-3 active:bg-slate-800"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
