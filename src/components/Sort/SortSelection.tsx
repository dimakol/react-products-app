import React from "react";

import { useAppDispatch } from "../../hooks";
import { productsActions } from "../../store/products-slice";

import "./SortSelection.scss";

const SortSelection = () => {
  const dispatch = useAppDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(productsActions.setSortOption({ option: event.target.value }));
  };

  return (
    <>
      Sort by
      <select className="sort-selection" onChange={handleSelect}>
        <option value="name">Name</option>
        <option value="creation_date">Recently Added</option>
      </select>
    </>
  );
};

export default SortSelection;
