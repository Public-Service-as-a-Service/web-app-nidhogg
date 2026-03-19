import { useEffect } from "react";
import { useSnackbar } from "@sk-web-gui/snackbar";

export function MsAuthListener() {
  const message = useSnackbar();

  useEffect(() => {
  const bc = new BroadcastChannel("ms-auth");

  bc.onmessage = (event) => {
    if (event.data?.type !== "ms-auth") return;

    if (event.data.success) {
      message({ message: "Inloggning med Microsoft lyckades!", status: "success", position: "bottom" });
    } else {
      message({ message: "Inloggning med Microsoft misslyckades.", status: "error", position: "bottom" });
    }
  };

  return () => bc.close();
}, []);

  return null;
}