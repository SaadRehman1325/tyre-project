import React, { useState } from "react";

export const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [productsSearchQuery, setproductsSearchQuery] = useState({});
  const [cart, setcart] = useState([]);

  const value = {
    productsSearchQuery,
    setproductsSearchQuery,
    cart,
    setcart,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
export default ProductProvider;
