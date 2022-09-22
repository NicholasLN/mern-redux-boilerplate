import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
