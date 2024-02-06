import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from "../loader/Loader";
const PaymentSuccessful = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            setLoading(true)
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/trasaction/${location.search.split("=")[1]}`, null, config).then((e) => {

                setInfo(e.data.info);
            }).catch((e) => {
                console.log(e);

            }).finally(() => { setLoading(false) })
        }else(navigate("/signin"))
    }, [location.search])
    setTimeout(() => { navigate("/dashboard") }, 30000);
    return (<>
        {!loading ? <div className="flex justify-center items-center h-screen  bg-slate-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <div className="flex items-center justify-center mb-6">
                    <FaCheckCircle className="text-green-600 h-10 w-10 mr-4 text-sm" />
                    <h1 className="text-lg font-semibold text-green-500">Payment Successful!</h1>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">Recipient: {info?.receiver}</p>
                    <p className="text-gray-700">Amount: {info?.amount}</p>
                    <p className="text-gray-700">Date & Time: {info?.time}</p>
                </div>
            </div>
        </div> : <div className="relative lg:left-[30rem] sm:left-[22rem] top-[20rem] left-[8rem]"><Loader /></div>}
    </>
    );
};


export default PaymentSuccessful;
