import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Administrators from "./components/administrators/Administrators";
import Countries from "./components/countries/Countries";
import ProtectedRute from "./components/ProtectedRoute/ProtectedRute";
import LoginProtectedRoute from "./components/ProtectedRoute/LoginProtectedRoute";
import UpdatePassword from "./components/administrators/updatePassword/UpdatePassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginProtectedRoute>
                <Login />
              </LoginProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRute>
                <Home />
              </ProtectedRute>
            }
          />
          <Route
            path="/administrators"
            element={
              <ProtectedRute>
                <Administrators />
              </ProtectedRute>
            }
          />
          <Route
            path="/countries"
            element={
              <ProtectedRute>
                <Countries />
              </ProtectedRute>
            }
          />
          <Route
            path="/updatepassword/:id"
            element={
              <ProtectedRute>
                <UpdatePassword />
              </ProtectedRute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
