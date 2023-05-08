import React from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { productsActions } from "../../../store/products-slice";

import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import productImage from "/images/product-image.png";

import "./Product.scss";

const Product: React.FC<{
  id: number;
  name: string;
  description: string | undefined;
  price: number;
  creationDate: string;
}> = (props) => {
  const dispatch = useAppDispatch();
  const productId = useAppSelector((state) => state.products.selectedProductId);

  const selectProduct = () => {
    dispatch(
      productsActions.setSelectedProductId({
        id: props.id,
      })
    );
  };

  const deleteProduct = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // for not calling the onClick handler of parent div (selectProduct)
    event.stopPropagation();
    dispatch(productsActions.deleteProduct({ id: props.id }));
    dispatch(productsActions.setSelectedProductId({ id: null }));
  };

  return (
    <div
      className={"product " + (productId === props.id ? "selected" : "")}
      onClick={selectProduct}
    >
      <img className="image" src={productImage} alt="image" />
      <div className="details">
        <div className="name">
          <h3>{props.name}</h3>
        </div>
        {props.description && (
          <div className="description">{props.description}</div>
        )}
      </div>
      <DeleteButton handleDelete={deleteProduct}></DeleteButton>
    </div>
  );
};

export default Product;
