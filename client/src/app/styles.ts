import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  loginMain: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
  },
  loginMainPaper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 4,
    padding: 4,
    borderRadius: 4,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "900px",
    height: "100vh",
    margin: "88px auto",
  },
};
