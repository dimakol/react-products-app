import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { productsActions } from "../../store/products-slice";
import IProduct from "../../interfaces/IProduct";

import SaveButton from "../Buttons/SaveButton/SaveButton";
import productImage from "/images/product-image-blue.png";

import "./ProductDetails.scss";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.productList);
  const id = useAppSelector((state) => state.products.selectedProductId);

  const [productName, setProductName] = useState("");
  const [inputName, setName] = useState("");
  const [inputDescription, setDescription] = useState("");
  const [inputPrice, setPrice] = useState<string>("");

  useEffect(() => {
    const product = findProductById(id as number);
    // product exists
    if (product) {
      setProductName(product.name);
      setName(product.name);
      if (product.description) {
        setDescription(product.description);
      }
      setPrice(product.price.toString());
    }
    // new product
    else {
      setProductName("");
      setName("");
      setDescription("");
      setPrice("");
    }
  }, [id]);

  const findProductById = (id: number): IProduct | undefined => {
    return products.find((product: IProduct) => product.id === id);
  };

  const validate = () => {
    return inputName.length > 0 && Number(inputPrice) > 0;
  };

  const saveProduct = () => {
    // id exists
    if (id !== 0) {
      // update
      dispatch(
        productsActions.updateProduct({
          id: id as number,
          name: inputName,
          description: inputDescription,
          price: Number(inputPrice),
        })
      );
    }
    // id don't exist
    else {
      // add
      dispatch(
        productsActions.addProduct({
          name: inputName,
          description: inputDescription,
          price: Number(inputPrice),
          creationDate: new Date().toISOString(),
        })
      );
    }
    dispatch(productsActions.setSelectedProductId({ id: null }));
  };

  return (
    <form className="product-details-form">
      <fieldset className="field-set">
        <legend>{productName} Details</legend>
        <img className="image" src={productImage} alt="image" />
        <label className="name-label" htmlFor="name">
          Name{" "}
        </label>
        <input
          type="text"
          id="name"
          className="name-input"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={inputName}
          maxLength={30}
          required
        />
        <label className="description-label" htmlFor="description">
          Description{" "}
        </label>
        <textarea
          id="description"
          className="description-text"
          name="description"
          rows={3}
          onChange={(event) => setDescription(event.target.value)}
          value={inputDescription}
          maxLength={200}
        />
        <label className="price-label" htmlFor="price">
          Price{" "}
        </label>
        <input
          type="number"
          id="price"
          className="price-input"
          name="price"
          onChange={(event) => setPrice(event.target.value)}
          value={inputPrice}
          min="0.01"
          step="0.01"
          required
        />
        $
        <SaveButton
          handleSave={saveProduct}
          handleValidate={validate}
        ></SaveButton>
      </fieldset>
    </form>
  );
};

export default ProductDetails;
