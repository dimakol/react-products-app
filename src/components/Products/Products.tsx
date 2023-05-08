import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { productsActions } from "../../store/products-slice";

import Product from "./Product/Product";
import IProduct from "../../interfaces/IProduct";

import "./Products.scss";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.productList);
  const sortOption = useAppSelector((state) => state.products.sortOption);

  useEffect(() => {
    if (sortOption === "name") {
      // sort by product name
      dispatch(productsActions.sortByProductName());
    } else if (sortOption === "creation_date") {
      // sort by creation date
      dispatch(productsActions.sortByCreationDate());
    }
  }, [sortOption, products]);

  return (
    <div className="products">
      {products.map((product: IProduct) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          creationDate={product.creationDate}
        ></Product>
      ))}
    </div>
  );
};

export default Products;
