import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <NextUIProvider>
        <main className="text-foreground bg-background-red">
          {/* <main className="dark text-foreground bg-light"> */}
          <App />
        </main>
      </NextUIProvider>
    </StrictMode>
  </BrowserRouter>
);
