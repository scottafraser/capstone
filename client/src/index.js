import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ErrorBoundry from "./components/ErrorBoundry";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
