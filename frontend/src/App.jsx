import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import PaymentSuccessful from "./components/Successful";
import PaymentFailed from "./components/PaymentFailed";
import Profile from "./pages/Profile";

function App() {
  const token = localStorage.getItem('token');
  



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <Signup />} />

        <Route path="/signin" element={token ? <Navigate to="/dashboard" /> : <Signin />} />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/send"
          element={token ? <SendMoney /> : <Navigate to="/signin" />}
        />
        <Route
          path="/success"
          element={token ? <PaymentSuccessful /> : <Navigate to="/signin" />}
        />
        <Route
          path="/failure"
          element={token ? <PaymentFailed /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/signin" />}
        />
        <Route
          path="/*"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
