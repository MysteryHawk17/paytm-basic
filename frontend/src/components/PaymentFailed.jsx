
import { ImCross } from "react-icons/im";
import { useLocation } from 'react-router-dom'
import { useTokenHook } from "../hooks/useTokenHook";
const PaymentFailed = () => {
  const location = useLocation();
  const isPresent = useTokenHook();
  if (isPresent == false) { return }
  const reason = decodeURIComponent(location.search.split("=")[1])
  return (
    <div className="flex justify-center items-center h-screen bg-cyan-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex items-center justify-center mb-6">
          <ImCross className="text-red-600 h-10 w-10 mr-4 text-sm" />
          <h1 className="text-lg font-semibold text-red-500">Payment Failed!</h1>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">Reason: {reason == "undefined" ? "" : reason}</p>
        </div>
      </div>
    </div>
  );
};



export default PaymentFailed;
