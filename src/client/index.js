import * as React from "react";
import * as ReactDOM from "react-dom/client";

// Tailwind //
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./app";
import WindowFocusHandler from "./windowFocusHandler";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <WindowFocusHandler>
      <App />
    </WindowFocusHandler>
  </Provider>
);
