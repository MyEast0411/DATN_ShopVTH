import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ placeHolder }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1,},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        size="small"
        label={placeHolder}
        variant="outlined"
      />
    </Box>
  );
}
