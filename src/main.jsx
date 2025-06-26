import { createRoot } from "react-dom/client";
import "./assets/styles/global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AccountProvider } from "./context/Account.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AccountProvider>
      <App />
      <Toaster richColors position="top-right"/>
    </AccountProvider>
  </BrowserRouter>
);
