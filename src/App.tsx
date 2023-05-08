import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks";
import { productsActions } from "./store/products-slice";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import AddButton from "./components/Buttons/AddButton/AddButton";
import SearchInput from "./components/Search/SearchInput";
import SortSelection from "./components/Sort/SortSelection";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import "./app.scss";

function App() {
  const dispatch = useAppDispatch();
  const selectedProductId = useAppSelector(
    (state) => state.products.selectedProductId
  );

  const getProducts = () => {
    fetch("json/products.json")
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        dispatch(productsActions.setProducts({ products }));
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = () => {
    dispatch(productsActions.setSelectedProductId({ id: 0 }));
  };

  return (
    <>
      <Header></Header>
      <Container>
        <AddButton handleAdd={addProduct}></AddButton>
        <SearchInput></SearchInput>
        <SortSelection></SortSelection>
        <div className="products-view">
          <Products></Products>
          {selectedProductId !== null && <ProductDetails></ProductDetails>}
        </div>
      </Container>
    </>
  );
}

export default App;
