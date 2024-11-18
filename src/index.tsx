import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { OidcProvider } from "./oidc/oidc";
import store from "./redux/store/store"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <OidcProvider fallback={<>Checking authentication ⌛️</>}>
          <App />
      </OidcProvider>
    </Provider>
  </StrictMode>
);
