import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../interfaces/IProduct";

// Define a type for the slice state
interface ProductsState {
  productList: IProduct[];
  selectedProductId: number | null;
  sortOption: string;
}

// Define the initial state using that type
const initialState: ProductsState = {
  productList: [],
  selectedProductId: null,
  sortOption: "name",
};

const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProducts(
      state: ProductsState,
      action: PayloadAction<{ products: IProduct[] }>
    ) {
      state.productList = action.payload.products;
    },
    setSelectedProductId(
      state: ProductsState,
      action: PayloadAction<{ id: number | null }>
    ) {
      state.selectedProductId = action.payload.id;
    },
    deleteProduct(state: ProductsState, action: PayloadAction<{ id: number }>) {
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload.id
      );
    },
    updateProduct(
      state: ProductsState,
      action: PayloadAction<{
        id: number;
        name: string;
        description?: string;
        price: number;
      }>
    ) {
      const productIndex = state.productList.findIndex(
        (product) => product.id === action.payload.id
      );
      state.productList[productIndex].name = action.payload.name;
      state.productList[productIndex].description = action.payload.description;
      state.productList[productIndex].price = action.payload.price;
    },
    addProduct(
      state: ProductsState,
      action: PayloadAction<{
        name: string;
        description?: string;
        price: number;
        creationDate: string;
      }>
    ) {
      // find max id in product list
      const maxId = state.productList.reduce(
        (max, product) => (product.id > max ? product.id : max),
        state.productList[0].id
      );
      const product = {
        id: maxId + 1,
        name: action.payload.name,
        description: action.payload.description,
        price: action.payload.price,
        creationDate: action.payload.creationDate,
      };
      state.productList.push(product);
    },
    setSortOption(
      state: ProductsState,
      action: PayloadAction<{
        option: string;
      }>
    ) {
      state.sortOption = action.payload.option;
    },
    sortByProductName(state: ProductsState) {
      state.productList.sort((product1, product2) => {
        const nameA = product1.name.toUpperCase(); // ignore upper and lowercase
        const nameB = product2.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    },
    sortByCreationDate(state: ProductsState) {
      state.productList.sort((product1, product2) => {
        const dateA = product1.creationDate;
        const dateB = product2.creationDate;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }

        // dates must be equal
        return 0;
      });
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
