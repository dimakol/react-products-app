import { configureStore } from "@reduxjs/toolkit";

import productsSlice from "./products-slice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {dictionary: DictionaryState}
export type AppDispatch = typeof store.dispatch;

export default store;
