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
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "30px auto",
    marginBottom: "80px",
  },
};
