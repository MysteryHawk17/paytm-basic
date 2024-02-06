import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import PaymentSuccessful from "./components/Successful";
import PaymentFailed from "./components/PaymentFailed";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}//
        />
        <Route
          path="/send"
          element={<SendMoney />}
        />
        <Route
          path="/success"
          element={<PaymentSuccessful />}//
        />
        <Route
          path="/failure"
          element={<PaymentFailed />}//
        />
        <Route
          path="/*"
          element={<Navigate to="/dashboard" />}//
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
