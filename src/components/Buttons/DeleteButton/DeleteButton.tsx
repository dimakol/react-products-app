import React from "react";

import "./DeleteButton.scss";

const DeleteButton: React.FC<{
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}> = (props) => {
  return (
    <button
      className="delete-button"
      onClick={(event) => props.handleDelete(event)}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
