import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AccountProvider } from "./context/Account.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AccountProvider>
      <App />
    </AccountProvider>
  </BrowserRouter>
);
