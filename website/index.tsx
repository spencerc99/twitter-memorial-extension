import { createRoot } from "react-dom/client";
import { HomePage } from "./home/homepage";
import "./home/home.scss";
function Router() {
  return <HomePage />;
}

const root = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<Router />);
