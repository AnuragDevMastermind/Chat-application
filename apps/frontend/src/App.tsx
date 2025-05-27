import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { HOME_ENDPOINT, LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "@repo/utils/endpoints";
import HomePage from "./pages/HomePage";
import { AuthRoute, ProtectedRoute } from "./components/custom/Route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path={LOGIN_ENDPOINT} >
            <Route index element={<LoginPage/>} />
          </Route>
          <Route path={SIGNUP_ENDPOINT} >
            <Route index element={<SignupPage/>} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={HOME_ENDPOINT} element={<HomePage />} />
          <Route path={"*"} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
