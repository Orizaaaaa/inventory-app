import Provider from "./provider";
import { Routes } from "@generouted/react-router";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <Routes />
  </Provider>
);
