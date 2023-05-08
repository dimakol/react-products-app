import React from "react";

import "./AddButton.scss";

const AddButton: React.FC<{
  handleAdd: () => void;
}> = (props) => {
  return (
    <button className="add-button" onClick={props.handleAdd}>
      + Add
    </button>
  );
};

export default AddButton;
