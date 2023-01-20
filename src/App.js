import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Administrators from "./components/administrators/Administrators";
import Countries from "./components/countries/Countries";
// import ProtectedRute from "./components/ProtectedRoute/ProtectedRute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              // <ProtectedRute>
              <Home />
              // </ProtectedRute>
            }
          />
          <Route
            path="/administrators"
            element={
              // <ProtectedRute>
              <Administrators />
              // </ProtectedRute>
            }
          />
          <Route
            path="/countries"
            element={
              // <ProtectedRute>
              <Countries />
              // </ProtectedRute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
