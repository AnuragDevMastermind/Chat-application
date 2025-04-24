import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { HOME_ENDPOINT } from "./constants/strings";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "@repo/utils/endpoints";
import { NavBar } from "./components/Navbar";
import { CustomSnackBar } from "./components/CustomSnackbars";
import { AuthRoute, ProtectedRoute } from "./components/Route";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <CustomSnackBar />
        <Routes>
          <Route element={<AuthRoute />}>
            <Route
              path={SIGNUP_ENDPOINT}
              element={
                <>
                  <NavBar />
                  <SignUp />
                </>
              }
            />
            <Route
              path={LOGIN_ENDPOINT}
              element={
                <>
                  <NavBar />
                  <Login />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={HOME_ENDPOINT} element={<Home />} />
            <Route path={"*"} element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

// function App() {
//   return (
//     <>
//       <Router>
//         <CustomSnackBar />
//         <Routes>
//           <Route
//             path={SIGNUP_ENDPOINT}
//             element={
//               <>
//                 <NavBar />
//                 <SignUp />
//               </>
//             }
//           />
//           <Route
//             path={LOGIN_ENDPOINT}
//             element={
//               <>
//                 <NavBar />
//                 <Login />
//               </>
//             }
//           />
//           <Route path={HOME_ENDPOINT} element={<Home />} />
//           <Route path={"*"} element={<Home />} />
//         </Routes>
//       </Router>
//     </>
//   )
// }

export default App;
