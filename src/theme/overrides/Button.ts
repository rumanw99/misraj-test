import { alpha, Components, Theme } from "@mui/material";

export const ButtonStylesOverrides: Components<
  Omit<Theme, "components">
>["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
    disableElevation: true,
    variant: "contained",
    size: "large",
  },
  styleOverrides: {
    root: ({ ownerState }) => ({
      paddingTop: "4px",
      paddingBottom: "4px",
      borderRadius: "19.6px",
      paddingRight: ownerState.endIcon ? "10px" : "16px",
      paddingLeft: ownerState.startIcon ? "10px" : "16px",
      textTransform: "initial",
      "& .MuiButton-startIcon , .MuiButton-endIcon": {
        padding: 4,
        "& svg": {
          fontSize: "medium",
        },
      },
    }),
    fullWidth: {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
    contained: ({ ownerState, theme }) => {
      const color = ownerState.color ?? "inherit";
      return {
        "&:disabled": {
          backgroundColor:
            color === "inherit"
              ? "inherit"
              : alpha(theme.palette[color].main, 0.5),
          color: "#fff",
        },
      };
    },
    outlined: ({ ownerState, theme }) => {
      const color = ownerState.color ?? "inherit";
      return {
        "&:disabled": {
          borderColor:
            color === "inherit"
              ? "inherit"
              : alpha(theme.palette[color].main, 0.5),
          color:
            color === "inherit"
              ? "inherit"
              : alpha(theme.palette[color].main, 0.5),
        },
      };
    },
  },
};
