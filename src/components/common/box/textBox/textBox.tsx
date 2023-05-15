import { Box, Input, InputAdornment } from "@mui/material";
import React from "react";
import ApplyButton from "../../button/applyButton/applyButton";

export default function TextBox() {
  const ariaLabel = { "aria-label": "description" };

  return (
    <Input
      placeholder="commit message"
      inputProps={ariaLabel}
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <ApplyButton />
        </InputAdornment>
      }
    />
  );
}
