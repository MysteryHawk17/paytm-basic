import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from "../loader/Loader";
import { WhatsappShareButton, TelegramShareButton } from 'react-share';
import html2canvas from 'html2canvas';
const PaymentSuccessful = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [screenshot, setScreenshot] = useState(null);
    const targetRef = useRef(null);

    const captureScreenshot = () => {
        html2canvas(targetRef.current).then((canvas) => {
            setScreenshot(canvas.toDataURL());
        });
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            setLoading(true)
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/trasaction/${location.search.split("=")[1]}`, config).then((e) => {

                setInfo(e.data.info);
            }).catch((e) => {
                console.log(e);

            }).finally(() => { setLoading(false) })
        } else (navigate("/signin"))
    }, [location.search])
    // setTimeout(() => { navigate("/dashboard") }, 10000);
    return (<>
        {!loading ?

            <div className="flex flex-col justify-center items-center h-screen  bg-slate-100" >
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full" ref={targetRef}>
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
                <div className="flex gap-5 mt-10">
                    <button className="rounded-md bg-blue-600 text-white hover:bg-blue-700 p-2 " onClick={captureScreenshot}>Share</button>
                    <button 
                    className="rounded-md bg-green-600 text-white hover:bg-green-700 p-2 "
                    onClick={() => navigate("/dashboard")}>Dashboard</button>
                </div>
                {screenshot && (
                    <div>
                        {/* <img src={screenshot} alt="Screenshot" />*/}
                        <WhatsappShareButton url={screenshot}>Share on Whatsapp</WhatsappShareButton>                        <TelegramShareButton url={screenshot}>Share on Telegram</TelegramShareButton>
                        {/* Other social media share buttons can be added similarly */}
                    </div>
                )}
            </div>
            // </div >
            :

            <div className="relative lg:left-[30rem] sm:left-[22rem] top-[20rem] left-[8rem]"><Loader /></div>}
    </>
    );
};


export default PaymentSuccessful;
