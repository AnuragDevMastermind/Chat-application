import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SocketIOProvider } from "./context/SocketIOContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <SocketIOProvider>
      <App />
    </SocketIOProvider>
  </Provider>
);

reportWebVitals();
