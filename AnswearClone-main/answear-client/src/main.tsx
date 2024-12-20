import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "app/store.ts";
import ScrollToTop from "components/partials/ScrollToTop.tsx";
import "css/index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "utils/contexts/ThemeContext.tsx";
import { GOOGLE_CLIENT_ID } from "utils/envData.ts";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <Router>
            <ScrollToTop />
            <ThemeProvider>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <App />
                </GoogleOAuthProvider>
                <ToastContainer />
            </ThemeProvider>
        </Router>
    </Provider>,
);
