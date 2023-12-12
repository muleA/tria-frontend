import React, { useEffect } from "react";
import { I18nextProvider } from 'react-i18next';
import { Provider } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BackOfficeLayoutWrapper from "./components/back-office-layout";
import { Dashboard } from "./components/back-office/dashboard";
import PortalNavigation from "./components/portal/home-navbar";
import "./global.css";
import HomePage from "./pages/home";
import { useAuth } from "./shared/auth/use-auth";
import ErrorBoundary from "./shared/error-boundary";
import i18n from './shared/locals/i18n';
import AlertDialogSlide from "./shared/utilities/error-dialogue/error-dialogue";
import { useAppSelector } from "./store/app-store-hook";
import { store } from "./store/app.store";
const App = () => {
  const { session } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { error } = useAppSelector((state: any) => state.globalError);
console.log("erorr",error)
console.log("session",session)
  useEffect(() => {
    if (session === null && location.pathname !== "/") {
      navigate("/");
    } else if (session && location.pathname === "/") {
      if (session?.userInfo?.accountType ==='user') {
        navigate("/home");

      } else {
        navigate(`/dashboard`);
      }
    }
  }, [session, location.pathname, navigate]);
  return (
    <I18nextProvider i18n={i18n}>

    <ErrorBoundary>
      <Provider store={store}>
      {error && <AlertDialogSlide error={error} />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          {session !== null &&
            session?.userInfo?.accountType!=='user' && (
              <><Route
              path="*"
              element={<React.Fragment>
                <BackOfficeLayoutWrapper>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </BackOfficeLayoutWrapper>
              </React.Fragment>} /></>
            )}
          {session !== null &&
            session?.userInfo?.accountType ==='user' && (
              <Route
                path="*"
                element={
                  <React.Fragment>
                    <PortalNavigation />
                    <Routes>
                      <Route
                        path="/"
                        element={<HomePage />}
                      />
                    </Routes>
                  </React.Fragment>
                }
              />
            )}
        </Routes>
      </Provider>
    </ErrorBoundary>
    </I18nextProvider>
  );
};

export default App;