import React from "react";

import "./SaveButton.scss";

const SaveButton: React.FC<{
  handleSave: () => void;
  handleValidate: () => boolean;
}> = (props) => {
  return (
    <button
      className="save-button"
      onClick={props.handleSave}
      disabled={!props.handleValidate()}
    >
      Save
    </button>
  );
};

export default SaveButton;
