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
    border: "1px solid #cb71ff",
    boxShadow: "0px 10px 25px 0px rgba(75,11,75,1)",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "900px",
    height: "100vh",
    margin: "88px auto",
  },
};
