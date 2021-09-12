import React from "react";

import { label } from "./Label.css";

export const Label = ({ children, props }) => {
  return (
    <label {...props} className={label}>
      {children}
    </label>
  );
};
